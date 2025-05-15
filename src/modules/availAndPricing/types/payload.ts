import { DateRangeDTO } from '@/common/dto/DateRange.dto'
import { HousingUnitResponseDTO } from '@/modules/housingUnitType/dto/HousingUnitResponse.dto'
import { ReservationServiceDTO } from '@/modules/reservation/dto/ReservationService.dto'
import { AvailAndPricingAgeGroupSearchDTO } from '../dto/AvailAndPricingAgeGroupSearch.dto'
import {
    UnavailabilityReason,
    UnavailableSource,
} from '../enum/UnavailableReason.enum'
import {
    AvailAndPricingAgeGroup,
    AvailAndPricingHostingRules,
    AvailAndPricingHousingUnitType,
    AvailAndPricingOffer,
    AvailAndPricingRateOption,
    AvailAndPricingReservation,
    AvailAndPricingSeasonRules,
    AvailAndPricingService,
    AvailAndPricingSpecialDates,
} from '.'

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
    [date: string]: AvailAndPricingSummary
}

export interface HousingUnitTypeWithCalendar {
    housingUnitType: AvailAndPricingHousingUnitType
    calendar: Calendar
}

export interface HousingUnitTypeAvailability {
    available: boolean
    unavailabilitySource: UnavailableSource | null
    unavailableReason: UnavailabilityReason | null
    unavailableReasonMessage: string | null
}

export interface PricingSummary {
    basePrice: number
    servicesPrice: number
    rateOptionPrice: number
    childrenPrice: number
    finalPrice: number
}

export interface AvailAndPricingSummary
    extends AvailAndPricingBasePayload,
        PricingSummary {
    totalStay: number | null
    finalMinStay: number
    availableHousingUnits: HousingUnitResponseDTO[]
    availability: HousingUnitTypeAvailability[]
}

export interface ReservationSummary {
    housingUnitType: AvailAndPricingHousingUnitType
    housingUnit: HousingUnitResponseDTO | null
    summary: AvailAndPricingSummary
}

export interface AvailAndPricingDayPayload {
    currentDate: string // "2025-01-01"
    pricingPayload: HouseUnitTypeAvailAndPricingPayload
    calendar: Calendar
}

export interface AvailAndPricingRule {
    apply?(payload: AvailAndPricingDayPayload): AvailAndPricingDayPayload
}
