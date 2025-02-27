import { ApiProperty } from '@nestjs/swagger'

import { HousingUnitResponseDTO } from './HousingUnitResponse.dto'
import { HousingUnitTypeFacilityResponseDTO } from './HousingUnitTypeFacilityResponse.dto'
import { HousingUnitTypeMediaResponseDTO } from './HousingUnitTypeMediaResponse.dto'

export class HousingUnitTypeResponseFullDTO {
    @ApiProperty({ example: '550e8400-e29b-41d4-a716-446655440000' })
    id: string

    @ApiProperty({ example: 'Deluxe' })
    name!: string

    @ApiProperty({ example: 'deluxe-suite' })
    slug!: string

    @ApiProperty({ example: 'a deluxe suite for 2 people', required: false })
    shortDescription?: string | null

    @ApiProperty({
        example:
            'The Deluxe Suite offers a spacious room with a king-size bed, a private balcony, and premium amenities.',
        required: false,
    })
    description?: string | null

    @ApiProperty({ example: 2 })
    order!: number

    @ApiProperty({ example: 2, required: false })
    minGuests?: number | null

    @ApiProperty({ example: 6, required: false })
    maxGuests?: number | null

    @ApiProperty({ example: 4, required: false })
    maxAdults?: number | null

    @ApiProperty({ example: 3, required: false })
    maxChildren?: number | null

    @ApiProperty({ example: 300 })
    weekdaysPrice!: number | null

    @ApiProperty({ example: 500 })
    weekendPrice!: number | null

    @ApiProperty({ example: 50 })
    extraAdultPrice!: number | null

    @ApiProperty({ example: 70 })
    chargeExtraAdultHigherThan!: number

    @ApiProperty({ type: [HousingUnitResponseDTO] })
    housingUnits!: HousingUnitResponseDTO[]

    @ApiProperty({ type: [HousingUnitTypeFacilityResponseDTO] })
    facilities!: HousingUnitTypeFacilityResponseDTO[]

    @ApiProperty({ type: [HousingUnitTypeMediaResponseDTO] })
    medias?: HousingUnitTypeMediaResponseDTO[]
}
