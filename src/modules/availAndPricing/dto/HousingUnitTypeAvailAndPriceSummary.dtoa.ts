import { ApiProperty } from '@nestjs/swagger'

import { HostingRulesResponseDTO } from '@/modules/company/dto/HostingRulesResponse.dto'
import { RateOptionResponseDTO } from '@/modules/rateOption/dto/RateOptionResponse.dto'
import { ServiceResponseDTO } from '@/modules/service/dtos/ServiceResponse.dto'
import { HousingUnitTypeAvailAndPriceSummary } from '../types/payload'

import { AvailabilityDTO } from './Availability.dto'
import { AvailAndPricingOffersDTO } from './AvailAndPricingOffers.dto'
import { AvailAndPricingReservationDTO } from './AvailAndPricingReservation.dto'
import { AvailAndPricingSeasonRulesDTO } from './AvailAndPricingSeasonRules.dto'
import { AvailAndPricingSpecialDatesDTO } from './AvailAndPricingSpecialDates.dto'

export class HousingUnitTypeAvailAndPriceSummaryDTO
    implements HousingUnitTypeAvailAndPriceSummary
{
    @ApiProperty({
        description: 'Base price for the day',
        type: Number,
    })
    basePrice: number

    @ApiProperty({
        description: 'Final price for the day',
        type: Number,
    })
    finalPrice: number

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
        type: RateOptionResponseDTO,
        nullable: true,
    })
    rateOption: RateOptionResponseDTO | null

    @ApiProperty({
        description: 'Total days for the day',
        type: Number,
    })
    totalStay: number
}
