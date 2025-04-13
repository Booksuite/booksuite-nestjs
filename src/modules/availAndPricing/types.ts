import { HousingUnit, Prisma } from '@prisma/client'

import { DateRangeDTO } from '@/common/dto/DateRange.dto'

import {
    UnavailabilityReason,
    UnavailableSource,
} from './enum/UnavailableReason.enum'

export type AvailAndPricingHostingRules = Prisma.HostingRulesGetPayload<{
    select: {
        checkIn: true
        checkOut: true
        minDaily: true
        fixedWindowPeriod: true
        availableWeekend: true

        availableWeekDays: true
    }
}> & {
    reservationWindowStart: string | null
    reservationWindowEnd: string | null
}
export type AvailAndPricingSeasonRules = Prisma.SeasonRulesGetPayload<{
    include: {
        housingUnitTypePrices: { select: { housingUnitTypeId: true } }
    }
}>
export type AvailAndPricingSpecialDates = Prisma.SpecialDateGetPayload<{
    include: {
        housingUnitTypePrices: { select: { housingUnitTypeId: true } }
    }
}>
export type AvailAndPricingOffers = Prisma.OfferGetPayload<{
    include: {
        availableHousingUnitTypes: { select: { housingUnitTypeId: true } }
    }
}>

export type AvailAndPricingHousingUnitType = Prisma.HousingUnitTypeGetPayload<{
    select: {
        id: true
        name: true
        weekdaysPrice: true
        weekendPrice: true
        housingUnits: { orderBy: { order: 'asc' } }
    }
}>

export type AvailAndPricingReservation = Omit<
    Prisma.ReservationGetPayload<{
        include: {
            housingUnit: { select: { id: true; housingUnitTypeId: true } }
        }
    }>,
    'startDate' | 'endDate'
> & {
    startDate: string
    endDate: string
}

export interface AvailAndPricingBasePayload {
    hostingRules: AvailAndPricingHostingRules
    seasonRules: AvailAndPricingSeasonRules[]
    specialDates: AvailAndPricingSpecialDates[]
    reservations: AvailAndPricingReservation[]
    offers: AvailAndPricingOffers[]
    dateRange: DateRangeDTO
}

export interface AvailAndPricingPayload extends AvailAndPricingBasePayload {
    housingUnitTypes: AvailAndPricingHousingUnitType[]
}

export interface HouseUnitTypeAvailAndPricingPayload
    extends AvailAndPricingBasePayload {
    totalDays: number
    housingUnitType: AvailAndPricingHousingUnitType
}

export interface Calendar {
    [date: string]: CalendarDay
}

export interface HousingUnitTypeAvailability
    extends AvailAndPricingHousingUnitType {
    calendar: Calendar
    housingUnits: HousingUnit[]
}

export interface CalendarAvailability {
    available: boolean
    unavailabilitySource: UnavailableSource | null
    unavailableReason: UnavailabilityReason | null
    unavailableReasonMessage: string | null
}

export interface CalendarDay {
    basePrice: number
    finalPrice: number
    finalMinDays: number
    hostingRules: AvailAndPricingHostingRules
    seasonRules: AvailAndPricingSeasonRules | null
    specialDates: AvailAndPricingSpecialDates | null
    offers: AvailAndPricingOffers | null
    reservations: AvailAndPricingReservation[]
    availability: CalendarAvailability
}

export interface AvailAndPricingDayPayload {
    currentDate: string // "2025-01-01"
    pricingPayload: HouseUnitTypeAvailAndPricingPayload
    calendar: Calendar
}

export interface AvailAndPricingRule {
    apply?(payload: AvailAndPricingDayPayload): AvailAndPricingDayPayload
}
