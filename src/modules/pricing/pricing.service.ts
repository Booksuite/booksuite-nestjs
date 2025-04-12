import { Injectable } from '@nestjs/common'
import dayjs from 'dayjs'
import { omit } from 'radash'

import { DateRangeDTO } from '@/common/dto/DateRange.dto'
import { PrismaService } from '../prisma/prisma.service'

import { OCCUPIED_RESERVATION_STATUS } from './constants'
import { PricingRules } from './rules/PricingRules'
import {
    Calendar,
    CalendarDay,
    CalendarHousingUnitType,
    CalendarPayload,
    HouseUnitTypePricingPayload,
    HousingUnitTypeCalendar,
} from './types'

@Injectable()
export class PricingService {
    constructor(
        private readonly prismaService: PrismaService,
        private readonly pricingRules: PricingRules,
    ) {}

    async getCalendar(
        companyId: string,
        currentDate: string,
        dateRange: DateRangeDTO,
    ): Promise<HousingUnitTypeCalendar[]> {
        const calendarPayload = await this.getCalendarPayload(
            companyId,
            currentDate,
            dateRange,
        )

        const housingUnitTypeCalendars =
            calendarPayload.housingUnitTypes.map<HousingUnitTypeCalendar>(
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
        housingUnitTypePayload: HouseUnitTypePricingPayload,
    ): HousingUnitTypeCalendar {
        const housingUnitType = housingUnitTypePayload.housingUnitType
        const housingUnits = housingUnitTypePayload.housingUnitType.housingUnits
        const calendar = this.calculateHousingUnitTypeCalendar(
            housingUnitTypePayload,
        )

        return {
            ...housingUnitType,
            calendar,
            housingUnits,
        }
    }

    async getCalendarPayload(
        companyId: string,
        currentDate: string,
        dateRange: DateRangeDTO,
    ): Promise<CalendarPayload> {
        const hostingRules = await this.prismaService.hostingRules.findUnique({
            where: { companyId },
        })

        if (!hostingRules) throw new Error('Hosting rule not found')

        const housingUnitTypes =
            await this.prismaService.housingUnitType.findMany({
                where: { companyId, published: true },

                select: {
                    id: true,
                    name: true,
                    weekdaysPrice: true,
                    weekendPrice: true,
                    housingUnits: { orderBy: { order: 'asc' } },
                },
            })

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
                startDate: { lte: dateRange.start },
                endDate: { gte: dateRange.end },
                published: true,
                AND: [
                    {
                        OR: [
                            { visibilityStart: null },
                            { visibilityStart: { lte: currentDate } },
                        ],
                    },
                    {
                        OR: [
                            { visibilityEnd: null },
                            { visibilityEnd: { gte: currentDate } },
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
                startDate: { lte: dateRange.start },
                endDate: { gte: dateRange.end },
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
                startDate: { lte: dateRange.end },
                endDate: { gte: dateRange.start },
            },
            include: {
                housingUnit: { select: { id: true, housingUnitTypeId: true } },
            },
        })

        return {
            dateRange,
            housingUnitTypes,
            hostingRules,
            seasonRules,
            specialDates,
            reservations,
            offers,
        }
    }

    filterHousingUnitTypePayload(
        housingUnitType: CalendarHousingUnitType,
        {
            seasonRules,
            specialDates,
            offers,
            reservations,
            ...restPayload
        }: CalendarPayload,
    ): HouseUnitTypePricingPayload {
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
        payload: HouseUnitTypePricingPayload,
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

    getInitialCalendarDay(payload: HouseUnitTypePricingPayload): CalendarDay {
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
