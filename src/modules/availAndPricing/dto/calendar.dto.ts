import { ApiProperty } from '@nestjs/swagger'

import { HostingRulesResponseDTO } from '@/modules/company/dto/HostingRulesResponse.dto'
import { CalendarDay } from '../types/payload'

import { AvailabilityDTO } from './Availability.dto'
import { AvailAndPricingOffersDTO } from './AvailAndPricingOffers.dto'
import { AvailAndPricingReservationDTO } from './AvailAndPricingReservation.dto'
import { AvailAndPricingSeasonRulesDTO } from './AvailAndPricingSeasonRules.dto'
import { AvailAndPricingSpecialDatesDTO } from './AvailAndPricingSpecialDates.dto'

export class CalendarDayResponseDTO implements CalendarDay {
    @ApiProperty({
        description: 'Base price for the day',
        type: Number,
    })
    basePrice: number

    @ApiProperty({
        description: 'Final price after all adjustments',
        type: Number,
    })
    finalPrice: number

    @ApiProperty({
        description: 'Final minimum days required',
        type: Number,
    })
    finalMinStay: number

    @ApiProperty({
        description: 'Hosting rules for the day',
        type: HostingRulesResponseDTO,
    })
    hostingRules: HostingRulesResponseDTO

    @ApiProperty({
        description: 'Season rules applicable for the day',
        type: AvailAndPricingSeasonRulesDTO,
        nullable: true,
    })
    seasonRules: AvailAndPricingSeasonRulesDTO | null

    @ApiProperty({
        description: 'Special dates applicable for the day',
        type: AvailAndPricingSpecialDatesDTO,
        nullable: true,
    })
    specialDates: AvailAndPricingSpecialDatesDTO | null

    @ApiProperty({
        description: 'Offers applicable for the day',
        type: AvailAndPricingOffersDTO,
        nullable: true,
    })
    offers: AvailAndPricingOffersDTO | null

    @ApiProperty({
        description: 'Reservations for the day',
        type: [AvailAndPricingReservationDTO],
    })
    reservations: AvailAndPricingReservationDTO[]

    @ApiProperty({
        description: 'Availability status for the day',
        type: AvailabilityDTO,
    })
    availability: AvailabilityDTO
}
