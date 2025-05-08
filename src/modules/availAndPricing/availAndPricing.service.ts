import { Injectable } from '@nestjs/common'
import { OfferType } from '@prisma/client'
import dayjs from 'dayjs'
import { omit, unique } from 'radash'

import { DateRangeDTO } from '@/common/dto/DateRange.dto'
import { PrismaService } from '../prisma/prisma.service'

import { OCCUPIED_RESERVATION_STATUS } from './constants'
import { AvailAndPricingRules } from './rules/PricingRules'
import {
    AvailAndPricingHostingRules,
    AvailAndPricingHousingUnitType,
} from './types'
import {
    AvailAndPricingPayload,
    AvailAndPricingSearchPayload,
    Calendar,
    HouseUnitTypeAvailAndPricingPayload,
    HousingUnitTypeAvailAndPrice,
    HousingUnitTypeWithCalendar,
    PricingSummary,
} from './types/payload'

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
                            totalStay: this.getTotalDays(
                                adjustedSearchPayload.dateRange,
                            ),
                        },
                    },
                ]
            },
            [],
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

    private sumCalendarPrices(calendar: PricingSummary[]): PricingSummary {
        const summary = calendar.reduce<PricingSummary>(
            (acc, day) => {
                acc.basePrice += day.basePrice
                acc.finalPrice += day.finalPrice
                acc.servicesPrice += day.servicesPrice
                acc.childrenPrice += day.childrenPrice
                acc.rateOptionPrice += day.rateOptionPrice

                if (!acc.hostingRules) acc.hostingRules = day.hostingRules
                if (!acc.rateOption) acc.rateOption = day.rateOption
                if (!acc.totalStay) acc.totalStay = day.totalStay
                if (day.finalMinStay > acc.finalMinStay)
                    acc.finalMinStay = day.finalMinStay

                if (day.seasonRules) acc.seasonRules.push(...day.seasonRules)
                if (day.specialDates) acc.specialDates.push(...day.specialDates)
                if (day.offers) acc.offers.push(...day.offers)
                if (day.reservations) acc.reservations.push(...day.reservations)
                if (day.services) acc.services.push(...day.services)

                acc.availability.push(...day.availability)

                return acc
            },
            {
                totalStay: 0,
                servicesPrice: 0,
                rateOptionPrice: 0,
                childrenPrice: 0,
                finalMinStay: 0,
                basePrice: 0,
                finalPrice: 0,
                hostingRules: null as unknown as AvailAndPricingHostingRules,
                seasonRules: [],
                specialDates: [],
                offers: [],
                reservations: [],
                availability: [],
                services: [],
                rateOption: null,
            },
        )

        summary.seasonRules = unique(summary.seasonRules, (item) => item.id)
        summary.services = unique(summary.services, (item) => item.id)
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

    private getHousingUnitTypeCalendar(
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

    private async getCalendarPayload(
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
                published: true,
                AND: [
                    {
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
                    {
                        OR: [
                            { visibilityStartDate: null },
                            {
                                visibilityStartDate: {
                                    lte: formattedCurrentDate,
                                },
                            },
                        ],
                    },
                    {
                        endDate: {
                            gte: formattedCurrentDate,
                        },
                    },
                ],
            },
        })

        const specialDates = await this.prismaService.specialDate.findMany({
            include: {
                housingUnitTypePrices: true,
                includedServices: true,
            },
            where: {
                housingUnitTypePrices: {
                    some: { housingUnitTypeId: { in: housingUnitTypesIds } },
                },
                published: true,

                visibilityStartDate: {
                    lte: formattedCurrentDate,
                },
                // the visibility end date is the end date of the special date
                endDate: {
                    gte: formattedCurrentDate,
                },

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

        const housingUnitTypeOffers = await this.prismaService.offer.findMany({
            include: {
                validHousingUnitTypes: true,
                validServices: true,
            },
            where: {
                published: true,
                AND: [
                    {
                        OR: [
                            {
                                validHousingUnitTypes: {
                                    some: {
                                        housingUnitTypeId: {
                                            in: housingUnitTypesIds,
                                        },
                                    },
                                },
                            },
                            {
                                validServices: searchPayload?.services?.length
                                    ? {
                                          some: {
                                              serviceId: {
                                                  in: searchPayload?.services?.map(
                                                      (service) =>
                                                          service.serviceId,
                                                  ),
                                              },
                                          },
                                      }
                                    : undefined,
                            },
                        ],
                    },
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

        const services = searchPayload?.services
            ? await this.prismaService.service.findMany({
                  where: {
                      id: {
                          in: searchPayload.services.map((s) => s.serviceId),
                      },
                  },
              })
            : []

        const rateOption = searchPayload?.rateOptionId
            ? await this.prismaService.rateOption.findUnique({
                  where: { id: searchPayload.rateOptionId },
                  include: { ageGroupPrices: true },
              })
            : null

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
                totalStay: this.getTotalDays(searchPayload.dateRange),
                totalAdults: searchPayload.adults,
                totalChildren:
                    searchPayload.ageGroups?.reduce(
                        (acc, ageGroup) => acc + ageGroup.quantity,
                        0,
                    ) ?? 0,
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
            services,
            rateOption,
            seasonRules,
            specialDates,
            reservations: reservations.map((reservation) => ({
                ...reservation,
                startDate: dayjs
                    .utc(reservation.startDate)
                    .format('YYYY-MM-DD'),
                endDate: dayjs.utc(reservation.endDate).format('YYYY-MM-DD'),
            })),
            offers: housingUnitTypeOffers,
        }
    }

    private filterHousingUnitTypePayload(
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

        const filteredHousingUnitTypeOffers = offers.filter(
            (offer) =>
                offer.type === OfferType.HOUSING_UNIT_TYPE &&
                offer.validHousingUnitTypes.some(
                    (h) => h.housingUnitTypeId === housingUnitType.id,
                ),
        )

        const housingUnitTypeReservations = reservations.filter(
            (reservation) =>
                reservation.housingUnit?.housingUnitTypeId ===
                housingUnitType.id,
        )

        const serviceIds = restPayload.searchPayload?.services?.map(
            (service) => service.serviceId,
        )
        const filteredServiceOffers = serviceIds
            ? offers.filter((offer) => {
                  if (offer.type !== OfferType.SERVICE) return false

                  const validServices = offer.validServices.some((s) =>
                      serviceIds.includes(s.serviceId),
                  )
                  const validHousingUnitTypes =
                      offer.validHousingUnitTypes.length === 0 ||
                      offer.validHousingUnitTypes.some(
                          (h) => h.housingUnitTypeId === housingUnitType.id,
                      )

                  return validServices && validHousingUnitTypes
              })
            : []

        return {
            housingUnitType,
            serviceOffers: filteredServiceOffers,
            housingUnitTypeOffers: filteredHousingUnitTypeOffers,
            seasonRules: housingUnitTYpeSeasonRules,
            specialDates: housingUnitTypeSpecialDates,
            reservations: housingUnitTypeReservations,
            ...omit(restPayload, ['housingUnitTypes']),
        }
    }

    private calculateHousingUnitTypeCalendar(
        payload: HouseUnitTypeAvailAndPricingPayload,
    ): Calendar {
        const dayjsStart = dayjs.utc(payload.viewWindow.start).startOf('day')
        const dayjsEnd = dayjs.utc(payload.viewWindow.end).endOf('day')

        const days = Array.from(
            { length: dayjsEnd.diff(dayjsStart, 'days') + 1 },
            (_, i) => dayjsStart.add(i, 'day').format('YYYY-MM-DD'),
        ).reduce<Calendar>((acc, day) => {
            const initialDay = this.getInitialCalendarDay(payload)
            acc[day] = { ...initialDay }

            return this.pricingRules.applyRules(day, payload, acc)
        }, {} as Calendar)

        return days
    }

    private getInitialCalendarDay(
        payload: HouseUnitTypeAvailAndPricingPayload,
    ): PricingSummary {
        return {
            basePrice: 0,
            servicesPrice: 0,
            childrenPrice: 0,
            rateOptionPrice: 0,
            finalPrice: 0,
            finalMinStay: payload.hostingRules.minStay,
            hostingRules: payload.hostingRules,
            totalStay: null,
            rateOption: null,
            services: [],
            seasonRules: [],
            specialDates: [],
            reservations: [],
            offers: [],
            availability: [],
        }
    }
}
