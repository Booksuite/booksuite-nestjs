import { Injectable } from '@nestjs/common'
import dayjs from 'dayjs'
import { omit } from 'radash'

import { DateRangeDTO } from '@/common/dto/DateRange.dto'
import { PrismaService } from '../prisma/prisma.service'

import { OCCUPIED_RESERVATION_STATUS } from './constants'
import { AvailAndPricingRules } from './rules/PricingRules'
import {
    AvailAndPricingHousingUnitType,
    AvailAndPricingPayload,
    Calendar,
    CalendarDay,
    HouseUnitTypeAvailAndPricingPayload,
    HousingUnitTypeAvailability,
} from './types'

@Injectable()
export class AvailAndPricingService {
    constructor(
        private readonly prismaService: PrismaService,
        private readonly pricingRules: AvailAndPricingRules,
    ) {}

    async getCalendarFromHousingUnitTypeId(
        housingUnitTypeId: string,
        currentDate: string,
        dateRange: DateRangeDTO,
    ): Promise<HousingUnitTypeAvailability> {
        const housingUnitType =
            await this.prismaService.housingUnitType.findUnique({
                where: { id: housingUnitTypeId },
                select: {
                    id: true,
                    name: true,
                    companyId: true,
                    weekdaysPrice: true,
                    weekendPrice: true,
                    housingUnits: { orderBy: { order: 'asc' } },
                },
            })

        if (!housingUnitType) throw new Error('Acomodação não encontrada')

        const calendarPayload = await this.getCalendarPayload(
            housingUnitType.companyId,
            [housingUnitType],
            currentDate,
            dateRange,
        )

        return this.getHousingUnitTypeCalendar(
            this.filterHousingUnitTypePayload(housingUnitType, calendarPayload),
        )
    }

    async getCalendar(
        companyId: string,
        currentDate: string,
        dateRange: DateRangeDTO,
    ): Promise<HousingUnitTypeAvailability[]> {
        const housingUnitTypes =
            await this.prismaService.housingUnitType.findMany({
                where: { companyId, published: true },

                select: {
                    id: true,
                    name: true,
                    companyId: true,
                    weekdaysPrice: true,
                    weekendPrice: true,
                    housingUnits: { orderBy: { order: 'asc' } },
                },
            })

        const calendarPayload = await this.getCalendarPayload(
            companyId,
            housingUnitTypes,
            currentDate,
            dateRange,
        )

        const housingUnitTypeCalendars =
            calendarPayload.housingUnitTypes.map<HousingUnitTypeAvailability>(
                (housingUnitType) => {
                    const housingUnitTypePayload =
                        this.filterHousingUnitTypePayload(
                            housingUnitType,
                            calendarPayload,
                        )

                    return this.getHousingUnitTypeCalendar(
                        housingUnitTypePayload,
                    )
                },
            )

        return housingUnitTypeCalendars
    }

    getHousingUnitTypeCalendar(
        housingUnitTypePayload: HouseUnitTypeAvailAndPricingPayload,
    ): HousingUnitTypeAvailability {
        const housingUnitType = housingUnitTypePayload.housingUnitType
        const calendar = this.calculateHousingUnitTypeCalendar(
            housingUnitTypePayload,
        )

        return {
            ...housingUnitType,
            calendar,
        }
    }

    async getCalendarPayload(
        companyId: string,
        housingUnitTypes: AvailAndPricingHousingUnitType[],
        currentDate: string,
        dateRange: DateRangeDTO,
    ): Promise<AvailAndPricingPayload> {
        const formattedCurrentDate = dayjs.utc(currentDate).toISOString()
        const formattedDateRangeStart = dayjs.utc(dateRange.start).toISOString()
        const formattedDateRangeEnd = dayjs.utc(dateRange.end).toISOString()

        const hostingRules = await this.prismaService.hostingRules.findUnique({
            where: { companyId },
        })

        if (!hostingRules) throw new Error('Hosting rule not found')

        const housingUnitTypesIds = housingUnitTypes.map(
            (housingUnitType) => housingUnitType.id,
        )

        const seasonRules = await this.prismaService.seasonRules.findMany({
            include: {
                housingUnitTypePrices: true,
            },
            where: {
                housingUnitTypePrices: {
                    some: { housingUnitTypeId: { in: housingUnitTypesIds } },
                },
                startDate: { gte: formattedDateRangeStart },
                endDate: { lte: formattedDateRangeEnd },
                published: true,
                AND: [
                    {
                        OR: [
                            { visibilityStart: null },
                            {
                                visibilityStart: {
                                    lte: formattedCurrentDate,
                                },
                            },
                        ],
                    },
                    {
                        OR: [
                            { visibilityEnd: null },
                            {
                                visibilityEnd: {
                                    gte: formattedCurrentDate,
                                },
                            },
                        ],
                    },
                ],
            },
        })

        const specialDates = await this.prismaService.specialDate.findMany({
            include: {
                housingUnitTypePrices: true,
            },
            where: {
                housingUnitTypePrices: {
                    some: { housingUnitTypeId: { in: housingUnitTypesIds } },
                },
                startDate: { gte: formattedDateRangeStart },
                endDate: { lte: formattedDateRangeEnd },
                published: true,
            },
        })

        const offers = await this.prismaService.offer.findMany({
            include: {
                availableHousingUnitTypes: true,
            },
            where: {
                availableHousingUnitTypes: {
                    some: { housingUnitTypeId: { in: housingUnitTypesIds } },
                },
                published: true,
                // AND: [
                //     {
                //         OR: [
                //             { minAdvanceDays: null },
                //             {
                //                 minAdvanceDays: {
                //                     gte: dayjs
                //                         .utc(currentDate)
                //                         .diff(dateRange.start, 'days'),
                //                 },
                //             },
                //         ],
                //     },
                //     {
                //         OR: [
                //             { maxAdvanceDays: null },
                //             {
                //                 maxAdvanceDays: {
                //                     lte: dayjs
                //                         .utc(currentDate)
                //                         .diff(dateRange.start, 'days'),
                //                 },
                //             },
                //         ],
                //     },
                // ],
            },
        })

        const reservations = await this.prismaService.reservation.findMany({
            where: {
                housingUnit: { housingUnitTypeId: { in: housingUnitTypesIds } },
                status: { in: OCCUPIED_RESERVATION_STATUS },
                startDate: { gte: formattedDateRangeStart },
                endDate: { lte: formattedDateRangeEnd },
            },
            include: {
                housingUnit: { select: { id: true, housingUnitTypeId: true } },
            },
        })

        return {
            dateRange,
            housingUnitTypes,
            hostingRules: {
                ...hostingRules,
                reservationWindowStart:
                    dayjs
                        .utc(hostingRules.reservationWindowStart)
                        .toISOString() ?? null,
                reservationWindowEnd:
                    dayjs
                        .utc(hostingRules.reservationWindowEnd)
                        .toISOString() ?? null,
            },
            seasonRules,
            specialDates,
            reservations: reservations.map((reservation) => ({
                ...reservation,
                startDate: dayjs
                    .utc(reservation.startDate)
                    .format('YYYY-MM-DD'),
                endDate: dayjs.utc(reservation.endDate).format('YYYY-MM-DD'),
            })),
            offers,
        }
    }

    filterHousingUnitTypePayload(
        housingUnitType: AvailAndPricingHousingUnitType,
        {
            seasonRules,
            specialDates,
            offers,
            reservations,
            ...restPayload
        }: AvailAndPricingPayload,
    ): HouseUnitTypeAvailAndPricingPayload {
        const housingUnitTYpeSeasonRules = seasonRules.filter((seasonRule) =>
            seasonRule.housingUnitTypePrices.some(
                (price) => price.housingUnitTypeId === housingUnitType.id,
            ),
        )

        const housingUnitTypeSpecialDates = specialDates.filter((specialDate) =>
            specialDate.housingUnitTypePrices.some(
                (price) => price.housingUnitTypeId === housingUnitType.id,
            ),
        )

        const housingUnitTypeOffers = offers.filter((offer) =>
            offer.availableHousingUnitTypes.some(
                (h) => h.housingUnitTypeId === housingUnitType.id,
            ),
        )

        const housingUnitTypeReservations = reservations.filter(
            (reservation) =>
                reservation.housingUnit?.housingUnitTypeId ===
                housingUnitType.id,
        )

        return {
            housingUnitType,
            seasonRules: housingUnitTYpeSeasonRules,
            specialDates: housingUnitTypeSpecialDates,
            offers: housingUnitTypeOffers,
            reservations: housingUnitTypeReservations,
            totalDays: dayjs
                .utc(restPayload.dateRange.end)
                .diff(dayjs.utc(restPayload.dateRange.start), 'days'),
            ...omit(restPayload, ['housingUnitTypes']),
        }
    }

    calculateHousingUnitTypeCalendar(
        payload: HouseUnitTypeAvailAndPricingPayload,
    ): Calendar {
        const dayjsStart = dayjs.utc(payload.dateRange.start).startOf('day')
        const dayjsEnd = dayjs.utc(payload.dateRange.end).endOf('day')

        const initialDay = this.getInitialCalendarDay(payload)

        const days = Array.from(
            { length: dayjsEnd.diff(dayjsStart, 'days') + 1 },
            (_, i) => dayjsStart.add(i, 'day').format('YYYY-MM-DD'),
        ).reduce<Calendar>((acc, day) => {
            acc[day] = { ...initialDay }

            return this.pricingRules.applyRules(day, payload, acc)
        }, {} as Calendar)

        return days
    }

    getInitialCalendarDay(
        payload: HouseUnitTypeAvailAndPricingPayload,
    ): CalendarDay {
        const weekDay = dayjs(payload.dateRange.start).startOf('day').day()
        const isWeekend =
            payload.hostingRules.availableWeekend.includes(weekDay)

        const basePrice = isWeekend
            ? payload.housingUnitType.weekendPrice
            : payload.housingUnitType.weekdaysPrice

        return {
            basePrice,
            finalPrice: basePrice,
            finalMinDays: payload.hostingRules.minDaily,
            hostingRules: payload.hostingRules,
            seasonRules: null,
            specialDates: null,
            reservations: [],
            offers: null,
            availability: {
                available: true,
                unavailabilitySource: null,
                unavailableReason: null,
                unavailableReasonMessage: null,
            },
        }
    }
}
