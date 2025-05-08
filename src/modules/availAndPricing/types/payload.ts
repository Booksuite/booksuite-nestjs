import { Prisma, RateOption, Service } from '@prisma/client'

import { DateRangeDTO } from '@/common/dto/DateRange.dto'
import { ReservationServiceDTO } from '@/modules/reservation/dto/ReservationService.dto'
import { AvailAndPricingAgeGroupSearchDTO } from '../dto/AvailAndPricingAgeGroupSearch.dto'
import {
    UnavailabilityReason,
    UnavailableSource,
} from '../enum/UnavailableReason.enum'
import {
    AvailAndPricingAgeGroup,
    AvailAndPricingHousingUnitType,
    AvailAndPricingOffer,
    AvailAndPricingRateOption,
    AvailAndPricingSeasonRules,
    AvailAndPricingService,
    AvailAndPricingSpecialDates,
} from '.'
import { AvailAndPricingHostingRules } from '.'

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
    services?: Omit<ReservationServiceDTO, 'totalPrice'>[]
    rateOptionId?: string
}

interface AvailAndPricingBasePayload {
    hostingRules: AvailAndPricingHostingRules
    seasonRules: AvailAndPricingSeasonRules[]
    specialDates: AvailAndPricingSpecialDates[]
    reservations: AvailAndPricingReservation[]
    ageGroups: AvailAndPricingAgeGroup[]
    offers: AvailAndPricingOffer[]
    services: Service[]
    rateOption: RateOption | null
    searchPayload?: AvailAndPricingSearchPayload
    viewWindow: DateRangeDTO
}

export interface AvailAndPricingPayload extends AvailAndPricingBasePayload {
    housingUnitTypes: AvailAndPricingHousingUnitType[]
    searchPayload?: AvailAndPricingSearchPayload & { totalStay: number }
}

export interface HouseUnitTypeAvailAndPricingPayload
    extends Omit<AvailAndPricingBasePayload, 'offers'> {
    housingUnitTypeOffers: AvailAndPricingOffer[]
    serviceOffers: AvailAndPricingOffer[]
    housingUnitType: AvailAndPricingHousingUnitType
    searchPayload?: AvailAndPricingSearchPayload & { totalStay: number }
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
    servicesPrice: number | null
    rateOptionPrice: number | null
    finalPrice: number
    finalMinStay: number
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
    hostingRules: AvailAndPricingHostingRules
    seasonRules: AvailAndPricingSeasonRules[]
    specialDates: AvailAndPricingSpecialDates[]
    offers: AvailAndPricingOffer[]
    reservations: AvailAndPricingReservation[]
    services: AvailAndPricingService[]
    rateOption: AvailAndPricingRateOption | null
    availability: HousingUnitTypeAvailability[]
    totalStay: number
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
