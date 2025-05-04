import { AgeGroup, Prisma } from '@prisma/client'

import { DateRangeDTO } from '@/common/dto/DateRange.dto'

import { AvailAndPricingAgeGroupSearchDTO } from './dto/AvailAndPricingAgeGroupSearch.dto'
import {
    UnavailabilityReason,
    UnavailableSource,
} from './enum/UnavailableReason.enum'

export type AvailAndPricingHostingRules = Prisma.HostingRulesGetPayload<{
    select: {
        id: true
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
        housingUnitTypePrices: {
            select: {
                housingUnitTypeId: true
                baseWeekPrice: true
                finalWeekPrice: true
                baseWeekendPrice: true
                finalWeekendPrice: true
            }
        }
    }
}>

export type AvailAndPricingAgeGroup = AgeGroup & {
    quantity: number
}

export type AvailAndPricingSpecialDates = Prisma.SpecialDateGetPayload<{
    include: {
        housingUnitTypePrices: {
            select: {
                housingUnitTypeId: true
                baseWeekPrice: true
                finalWeekPrice: true
                baseWeekendPrice: true
                finalWeekendPrice: true
            }
        }
    }
}>
export type AvailAndPricingOffer = Prisma.OfferGetPayload<{
    include: {
        availableHousingUnitTypes: { select: { housingUnitTypeId: true } }
    }
}>

export type AvailAndPricingHousingUnitType = Prisma.HousingUnitTypeGetPayload<{
    include: {
        housingUnits: { orderBy: { order: 'asc' } }
    }
    omit: {
        companyId: true
    }
}>

export type AvailAndPricingReservation = Omit<
    Prisma.ReservationGetPayload<{
        include: { housingUnit: true; guestUser: true }
    }>,
    'startDate' | 'endDate'
> & {
    startDate: string
    endDate: string
}

export interface AvailAndPricingSearchPayload {
    dateRange: DateRangeDTO
    adults: number
    ageGroups?: AvailAndPricingAgeGroupSearchDTO[]
}

export interface AvailAndPricingBasePayload {
    hostingRules: AvailAndPricingHostingRules
    seasonRules: AvailAndPricingSeasonRules[]
    specialDates: AvailAndPricingSpecialDates[]
    reservations: AvailAndPricingReservation[]
    ageGroups: AvailAndPricingAgeGroup[]
    offers: AvailAndPricingOffer[]
    searchPayload?: AvailAndPricingSearchPayload
    viewWindow: DateRangeDTO
}

export interface AvailAndPricingPayload extends AvailAndPricingBasePayload {
    housingUnitTypes: AvailAndPricingHousingUnitType[]
    searchPayload?: AvailAndPricingSearchPayload & { totalDays: number }
}

export interface HouseUnitTypeAvailAndPricingPayload
    extends AvailAndPricingBasePayload {
    housingUnitType: AvailAndPricingHousingUnitType
    searchPayload?: AvailAndPricingSearchPayload & { totalDays: number }
}

export interface Calendar {
    [date: string]: CalendarDay
}

export interface HousingUnitTypeWithCalendar
    extends AvailAndPricingHousingUnitType {
    calendar: Calendar
}

export interface HousingUnitTypeAvailability {
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
    offers: AvailAndPricingOffer | null
    reservations: AvailAndPricingReservation[]
    availability: HousingUnitTypeAvailability
}

export interface HousingUnitTypeAvailAndPriceSummary {
    basePrice: number
    finalPrice: number
    hostingRules: AvailAndPricingHostingRules[]
    seasonRules: AvailAndPricingSeasonRules[]
    specialDates: AvailAndPricingSpecialDates[]
    offers: AvailAndPricingOffer[]
    reservations: AvailAndPricingReservation[]
    availability: HousingUnitTypeAvailability[]
}

export interface HousingUnitTypeAvailAndPrice
    extends AvailAndPricingHousingUnitType {
    summary: HousingUnitTypeAvailAndPriceSummary
}

export interface AvailAndPricingDayPayload {
    currentDate: string // "2025-01-01"
    pricingPayload: HouseUnitTypeAvailAndPricingPayload
    calendar: Calendar
}

export interface AvailAndPricingRule {
    apply?(payload: AvailAndPricingDayPayload): AvailAndPricingDayPayload
}

export interface ReservationPricing {
    basePrice: number
    ageGroupsPrice: number
    extraAdultsPrice: number
    offerPrice: number
    servicesPrice: number
    rateOptionPrice: number
    totalAmount: number
}
