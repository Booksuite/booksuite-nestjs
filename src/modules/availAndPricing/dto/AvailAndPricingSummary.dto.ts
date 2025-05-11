import { ApiProperty } from '@nestjs/swagger'

import { HostingRulesResponseDTO } from '@/modules/company/dto/HostingRulesResponse.dto'
import { HousingUnitResponseDTO } from '@/modules/housingUnitType/dto/HousingUnitResponse.dto'
import { ServiceResponseDTO } from '@/modules/service/dtos/ServiceResponse.dto'
import { AvailAndPricingSummary } from '../types/payload'

import { AvailabilityDTO } from './Availability.dto'
import { AvailAndPricingOffersDTO } from './AvailAndPricingOffers.dto'
import { AvailAndPricingRateOptionDTO } from './AvailAndPricingRateOption.dto'
import { AvailAndPricingReservationDTO } from './AvailAndPricingReservation.dto'
import { AvailAndPricingSeasonRulesDTO } from './AvailAndPricingSeasonRules.dto'
import { AvailAndPricingSpecialDatesDTO } from './AvailAndPricingSpecialDates.dto'
import { PricingSummaryDTO } from './PricingSummary.dto'

export class AvailAndPricingSummaryDTO
    extends PricingSummaryDTO
    implements AvailAndPricingSummary
{
    @ApiProperty({
        description: 'Final minimum days required',
        type: Number,
    })
    finalMinStay: number

    @ApiProperty({
        description: 'Season rules for the day',
        type: [AvailAndPricingSeasonRulesDTO],
    })
    seasonRules: AvailAndPricingSeasonRulesDTO[]

    @ApiProperty({
        description: 'Special dates for the day',
        type: [AvailAndPricingSpecialDatesDTO],
    })
    specialDates: AvailAndPricingSpecialDatesDTO[]

    @ApiProperty({
        description: 'Offers for the day',
        type: [AvailAndPricingOffersDTO],
    })
    offers: AvailAndPricingOffersDTO[]

    @ApiProperty({
        description: 'Reservations for the day',
        type: [AvailAndPricingReservationDTO],
    })
    reservations: AvailAndPricingReservationDTO[]

    @ApiProperty({
        description: 'Availability for the day',
        type: [AvailabilityDTO],
    })
    availability: AvailabilityDTO[]

    @ApiProperty({
        description: 'Hosting rules for the day',
        type: HostingRulesResponseDTO,
    })
    hostingRules: HostingRulesResponseDTO

    @ApiProperty({
        description: 'Services for the day',
        type: [ServiceResponseDTO],
    })
    services: ServiceResponseDTO[]

    @ApiProperty({
        description: 'Rate option for the day',
        type: AvailAndPricingRateOptionDTO,
        nullable: true,
    })
    rateOption: AvailAndPricingRateOptionDTO | null

    @ApiProperty({
        description: 'Total days for the day',
        type: Number,
        nullable: true,
    })
    totalStay: number | null

    @ApiProperty({
        description: 'Available housing units for the day',
        type: [HousingUnitResponseDTO],
    })
    availableHousingUnits: HousingUnitResponseDTO[]
}
