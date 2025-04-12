import { HostingRules, HousingUnit, Prisma } from '@prisma/client'

import { DateRangeDTO } from '@/common/dto/DateRange.dto'

import {
    UnavailabilityReason,
    UnavailableSource,
} from './enum/UnavailableReason.enum'

export type CalendarSeasonRules = Prisma.SeasonRulesGetPayload<{
    include: {
        housingUnitTypePrices: { select: { housingUnitTypeId: true } }
    }
}>
export type CalendarSpecialDates = Prisma.SpecialDateGetPayload<{
    include: {
        housingUnitTypePrices: { select: { housingUnitTypeId: true } }
    }
}>
export type CalendarOffers = Prisma.OfferGetPayload<{
    include: {
        availableHousingUnitTypes: { select: { housingUnitTypeId: true } }
    }
}>

export type CalendarHousingUnitType = Prisma.HousingUnitTypeGetPayload<{
    select: {
        id: true
        name: true
        weekdaysPrice: true
        weekendPrice: true
        housingUnits: { orderBy: { order: 'asc' } }
    }
}>

export type CalendarReservation = Prisma.ReservationGetPayload<{
    include: {
        housingUnit: { select: { id: true; housingUnitTypeId: true } }
    }
}>

export interface CalendarBasePayload {
    hostingRules: HostingRules
    seasonRules: CalendarSeasonRules[]
    specialDates: CalendarSpecialDates[]
    reservations: CalendarReservation[]
    offers: CalendarOffers[]
}

export interface CalendarPayload extends CalendarBasePayload {
    dateRange: DateRangeDTO
    housingUnitTypes: CalendarHousingUnitType[]
}

export interface HouseUnitTypePricingPayload extends CalendarBasePayload {
    dateRange: DateRangeDTO
    totalDays: number
    housingUnitType: CalendarHousingUnitType
}

export interface Calendar {
    [date: string]: CalendarDay
}

export interface HousingUnitTypeCalendar extends CalendarHousingUnitType {
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
    hostingRules: HostingRules
    seasonRules: CalendarSeasonRules | null
    specialDates: CalendarSpecialDates | null
    offers: CalendarOffers | null
    reservations: CalendarReservation[]
    availability: CalendarAvailability
}

export interface DayPricingPayload {
    currentDate: string // "2025-01-01"
    pricingPayload: HouseUnitTypePricingPayload
    calendar: Calendar
}

export interface PricingRule {
    apply?(payload: DayPricingPayload): DayPricingPayload
}
