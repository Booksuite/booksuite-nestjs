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
    AvailAndPricingSearchPayload,
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
        viewWindow: DateRangeDTO,
        searchPayload?: AvailAndPricingSearchPayload,
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
            viewWindow,
            searchPayload,
        )

        return this.getHousingUnitTypeCalendar(
            this.filterHousingUnitTypePayload(housingUnitType, calendarPayload),
        )
    }

    async getCalendar(
        companyId: string,
        currentDate: string,
        viewWindow: DateRangeDTO,
        searchPayload?: AvailAndPricingSearchPayload,
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
            viewWindow,
            searchPayload,
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
        viewWindow: DateRangeDTO,
        searchPayload?: AvailAndPricingSearchPayload,
    ): Promise<AvailAndPricingPayload> {
        const formattedCurrentDate = dayjs.utc(currentDate).toISOString()
        const formattedDateRangeStart = dayjs
            .utc(viewWindow.start)
            .startOf('day')
            .toISOString()
        const formattedDateRangeEnd = dayjs
            .utc(viewWindow.end)
            .endOf('day')
            .toISOString()

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
                AND: [
                    {
                        OR: [
                            { minAdvanceDays: null },
                            {
                                minAdvanceDays: {
                                    gte: dayjs
                                        .utc(formattedCurrentDate)
                                        .diff(formattedDateRangeStart, 'days'),
                                },
                            },
                        ],
                    },
                    {
                        OR: [
                            { maxAdvanceDays: null },
                            {
                                maxAdvanceDays: {
                                    lte: dayjs
                                        .utc(formattedCurrentDate)
                                        .diff(formattedDateRangeStart, 'days'),
                                },
                            },
                        ],
                    },
                ],
            },
        })

        const reservations = await this.prismaService.reservation.findMany({
            where: {
                housingUnit: { housingUnitTypeId: { in: housingUnitTypesIds } },
                status: { in: OCCUPIED_RESERVATION_STATUS },
                OR: [
                    {
                        startDate: {
                            lte: formattedDateRangeStart,
                        },
                        endDate: {
                            gte: formattedDateRangeEnd,
                        },
                    },
                    {
                        startDate: {
                            lte: formattedDateRangeEnd,
                        },
                        endDate: {
                            gte: formattedDateRangeEnd,
                        },
                    },
                    {
                        startDate: {
                            gte: formattedDateRangeStart,
                        },
                        endDate: {
                            lte: formattedDateRangeEnd,
                        },
                    },
                ],
            },
            include: {
                housingUnit: true,
                guestUser: true,
            },
        })

        return {
            searchPayload: searchPayload && {
                ...searchPayload,
                totalDays: dayjs
                    .utc(searchPayload.dateRange.end)
                    .endOf('day')
                    .diff(
                        dayjs.utc(searchPayload.dateRange.start).startOf('day'),
                        'days',
                    ),
            },
            viewWindow,
            housingUnitTypes,
            hostingRules: {
                ...hostingRules,
                reservationWindowStart:
                    (hostingRules.reservationWindowStart &&
                        dayjs
                            .utc(hostingRules.reservationWindowStart)
                            .toISOString()) ??
                    null,
                reservationWindowEnd:
                    (hostingRules.reservationWindowEnd &&
                        dayjs
                            .utc(hostingRules.reservationWindowEnd)
                            .toISOString()) ??
                    null,
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
            ...omit(restPayload, ['housingUnitTypes']),
        }
    }

    calculateHousingUnitTypeCalendar(
        payload: HouseUnitTypeAvailAndPricingPayload,
    ): Calendar {
        const dayjsStart = dayjs.utc(payload.viewWindow.start).startOf('day')
        const dayjsEnd = dayjs.utc(payload.viewWindow.end).endOf('day')

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
        return {
            basePrice: 0,
            finalPrice: 0,
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
