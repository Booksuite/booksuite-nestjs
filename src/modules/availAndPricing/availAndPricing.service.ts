import { Injectable } from '@nestjs/common'
import dayjs from 'dayjs'
import { omit, unique } from 'radash'

import { DateRangeDTO } from '@/common/dto/DateRange.dto'
import { PrismaService } from '../prisma/prisma.service'

import { OCCUPIED_RESERVATION_STATUS } from './constants'
import { AvailAndPricingRules } from './rules/PricingRules'
import {
    AvailAndPricingHostingRules,
    AvailAndPricingHousingUnitType,
    AvailAndPricingPayload,
    AvailAndPricingSearchPayload,
    Calendar,
    CalendarDay,
    HouseUnitTypeAvailAndPricingPayload,
    HousingUnitTypeAvailAndPrice,
    HousingUnitTypeAvailAndPriceSummary,
    HousingUnitTypeWithCalendar,
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
    ): Promise<HousingUnitTypeWithCalendar> {
        const adjustedSearchPayload = this.adjustSearchPayload(searchPayload)

        const housingUnitType =
            await this.prismaService.housingUnitType.findUnique({
                where: { id: housingUnitTypeId },
                include: {
                    housingUnits: { orderBy: { order: 'asc' } },
                },
            })

        if (!housingUnitType) throw new Error('Acomodação não encontrada')

        const calendarPayload = await this.getCalendarPayload(
            housingUnitType.companyId,
            [housingUnitType],
            currentDate,
            viewWindow,
            adjustedSearchPayload,
        )

        return this.getHousingUnitTypeCalendar(
            this.filterHousingUnitTypePayload(housingUnitType, calendarPayload),
        )
    }

    private adjustSearchPayload(
        searchPayload?: AvailAndPricingSearchPayload,
    ): AvailAndPricingSearchPayload | undefined {
        if (!searchPayload) return undefined

        const dateRange = {
            start: searchPayload.dateRange.start,
            end: dayjs
                .utc(searchPayload.dateRange.end)
                .subtract(1, 'day')
                .format('YYYY-MM-DD'),
        }

        return {
            ...searchPayload,
            dateRange,
        }
    }

    private getTotalDays(dateRange: DateRangeDTO): number {
        return (
            dayjs
                .utc(dateRange.end)
                .endOf('day')
                .diff(dayjs.utc(dateRange.start).startOf('day'), 'days') + 1
        )
    }

    async getCalendar(
        companyId: string,
        currentDate: string,
        viewWindow: DateRangeDTO,
        searchPayload?: AvailAndPricingSearchPayload,
    ): Promise<HousingUnitTypeWithCalendar[]> {
        const adjustedSearchPayload = this.adjustSearchPayload(searchPayload)

        const housingUnitTypes =
            await this.prismaService.housingUnitType.findMany({
                where: {
                    companyId,
                    published: true,
                },

                include: {
                    housingUnits: { orderBy: { order: 'asc' } },
                },
            })

        const calendarPayload = await this.getCalendarPayload(
            companyId,
            housingUnitTypes,
            currentDate,
            viewWindow,
            adjustedSearchPayload,
        )

        const housingUnitTypeCalendars =
            calendarPayload.housingUnitTypes.map<HousingUnitTypeWithCalendar>(
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

    async getTotalPrices(
        companyId: string,
        currentDate: string,
        searchPayload: AvailAndPricingSearchPayload,
    ): Promise<HousingUnitTypeAvailAndPrice[]> {
        const adjustedSearchPayload = this.adjustSearchPayload(searchPayload)
        if (!adjustedSearchPayload)
            throw new Error('Search payload is required')

        const housingUnitTypeAP = await this.getCalendar(
            companyId,
            currentDate,
            adjustedSearchPayload.dateRange,
            searchPayload,
        )

        if (!adjustedSearchPayload)
            throw new Error('Search payload is required')

        return housingUnitTypeAP.reduce<HousingUnitTypeAvailAndPrice[]>(
            (acc, housingUnitType) => {
                return [
                    ...acc,
                    {
                        ...omit(housingUnitType, ['calendar']),
                        summary: {
                            ...this.sumCalendarPrices(
                                Object.values(housingUnitType.calendar),
                            ),
                            totalDays: this.getTotalDays(
                                adjustedSearchPayload.dateRange,
                            ),
                        },
                    },
                ]
            },
            [],
        )
    }
    private sumCalendarPrices(
        calendar: CalendarDay[],
    ): HousingUnitTypeAvailAndPriceSummary {
        const summary = calendar.reduce<HousingUnitTypeAvailAndPriceSummary>(
            (acc, day) => {
                acc.basePrice += day.basePrice
                acc.finalPrice += day.finalPrice
                if (!acc.hostingRules) acc.hostingRules = day.hostingRules

                if (day.seasonRules) acc.seasonRules.push(day.seasonRules)
                if (day.specialDates) acc.specialDates.push(day.specialDates)
                if (day.offers) acc.offers.push(day.offers)
                if (day.reservations) acc.reservations.push(...day.reservations)

                acc.availability.push(day.availability)

                return acc
            },
            {
                totalDays: 0,
                basePrice: 0,
                finalPrice: 0,
                hostingRules: null as unknown as AvailAndPricingHostingRules,
                seasonRules: [],
                specialDates: [],
                offers: [],
                reservations: [],
                availability: [],
            },
        )

        summary.seasonRules = unique(summary.seasonRules, (item) => item.id)
        summary.specialDates = unique(summary.specialDates, (item) => item.id)
        summary.offers = unique(summary.offers, (item) => item.id)
        summary.reservations = unique(summary.reservations, (item) => item.id)
        summary.availability = unique(
            summary.availability,
            (item) =>
                `${item.available}.${item.unavailabilitySource}.${item.unavailableReason}`,
        )

        return summary
    }

    getHousingUnitTypeCalendar(
        housingUnitTypePayload: HouseUnitTypeAvailAndPricingPayload,
    ): HousingUnitTypeWithCalendar {
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
            .startOf('day')
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
                published: true,

                OR: [
                    {
                        startDate: {
                            lte: formattedDateRangeStart,
                        },
                        endDate: {
                            gte: formattedDateRangeStart,
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
        })

        const advanceDays = dayjs
            .utc(formattedDateRangeStart)
            .diff(formattedCurrentDate, 'days')

        const offers = await this.prismaService.offer.findMany({
            include: {
                availableHousingUnitTypes: true,
            },
            where: {
                availableHousingUnitTypes: {
                    some: {
                        housingUnitTypeId: { in: housingUnitTypesIds },
                    },
                },
                published: true,
                AND: [
                    {
                        OR: [
                            { minAdvanceDays: null },
                            { minAdvanceDays: { lte: advanceDays } },
                        ],
                    },
                    {
                        OR: [
                            { maxAdvanceDays: null },
                            { maxAdvanceDays: { gte: advanceDays } },
                        ],
                    },
                    {
                        OR: [
                            {
                                validStartDate: {
                                    lte: formattedDateRangeStart,
                                },
                                validEndDate: {
                                    gte: formattedDateRangeStart,
                                },
                            },
                            {
                                validStartDate: {
                                    lte: formattedDateRangeEnd,
                                },
                                validEndDate: {
                                    gte: formattedDateRangeEnd,
                                },
                            },
                            {
                                validStartDate: {
                                    gte: formattedDateRangeStart,
                                },
                                validEndDate: {
                                    lte: formattedDateRangeEnd,
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

        const ageGroups = searchPayload?.ageGroups
            ? await this.prismaService.ageGroup
                  .findMany({
                      where: {
                          id: {
                              in: searchPayload.ageGroups.map(
                                  (ageGroup) => ageGroup.ageGroupId,
                              ),
                          },
                      },
                  })
                  .then((ageGroups) => {
                      return ageGroups.map((ageGroup) => ({
                          ...ageGroup,
                          quantity:
                              searchPayload?.ageGroups?.find(
                                  (ag) => ag.ageGroupId === ageGroup.id,
                              )?.quantity || 0,
                      }))
                  })
            : []

        return {
            searchPayload: searchPayload && {
                ...searchPayload,
                totalDays: this.getTotalDays(searchPayload.dateRange),
            },
            ageGroups,
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
