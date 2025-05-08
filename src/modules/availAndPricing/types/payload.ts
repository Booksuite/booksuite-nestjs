import { Prisma } from '@prisma/client'

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
    offers: AvailAndPricingOffer[]
    services: AvailAndPricingService[]
    rateOption: AvailAndPricingRateOption | null
}

interface AvailAndPricingBasePayloadWithSearch
    extends AvailAndPricingBasePayload {
    searchPayload?: AvailAndPricingSearchPayload
    viewWindow: DateRangeDTO
    ageGroups: AvailAndPricingAgeGroup[]
}

export interface AvailAndPricingSearchPayloadWithExtra
    extends AvailAndPricingSearchPayload {
    totalStay: number
    totalAdults: number
    totalChildren: number
}

export interface AvailAndPricingPayload
    extends AvailAndPricingBasePayloadWithSearch {
    housingUnitTypes: AvailAndPricingHousingUnitType[]
    searchPayload?: AvailAndPricingSearchPayloadWithExtra
}

export interface HouseUnitTypeAvailAndPricingPayload
    extends Omit<AvailAndPricingBasePayloadWithSearch, 'offers'> {
    housingUnitTypeOffers: AvailAndPricingOffer[]
    serviceOffers: AvailAndPricingOffer[]
    housingUnitType: AvailAndPricingHousingUnitType
    searchPayload?: AvailAndPricingSearchPayloadWithExtra
}

export interface Calendar {
    [date: string]: PricingSummary
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

export interface PricingSummary extends AvailAndPricingBasePayload {
    basePrice: number
    servicesPrice: number
    rateOptionPrice: number
    totalStay: number | null
    finalPrice: number
    finalMinStay: number

    availability: HousingUnitTypeAvailability[]
}

export interface HousingUnitTypeAvailAndPrice
    extends AvailAndPricingHousingUnitType {
    summary: PricingSummary
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
