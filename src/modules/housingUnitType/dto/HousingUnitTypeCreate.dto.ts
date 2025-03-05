import { ApiProperty } from '@nestjs/swagger'
import { Type } from 'class-transformer'
import {
    IsArray,
    IsBoolean,
    IsDefined,
    IsInt,
    IsOptional,
    IsString,
    ValidateNested,
} from 'class-validator'

import { HousingUnitDTO } from './HousingUnit.dto'
import { HousingUnitTypeFacilityDTO } from './HousingUnitTypeFacility.dto'
import { HousingUnitTypeMediaDTO } from './HousingUnitTypeMedia.dto'

export class HousingUnitTypeCreateDTO {
    @ApiProperty({ example: 'Deluxe' })
    @IsDefined()
    @IsString()
    name!: string

    @ApiProperty({ example: true })
    @IsDefined()
    @IsBoolean()
    published: boolean

    @ApiProperty({ example: 'deluxe-suite' })
    @IsDefined()
    @IsString()
    slug!: string

    @ApiProperty({ example: 'a deluxe suite for 2 people', required: false })
    @IsOptional()
    @IsString()
    shortDescription?: string

    @ApiProperty({
        example:
            'The Deluxe Suite offers a spacious room with a king-size bed, a private balcony, and premium amenities.',
        required: false,
    })
    @IsOptional()
    @IsString()
    description?: string

    @ApiProperty({ example: 2 })
    @IsDefined()
    @IsInt()
    order!: number

    @ApiProperty({ example: 2, required: false })
    @IsOptional()
    @IsInt()
    minGuests?: number

    @ApiProperty({ example: 6, required: false })
    @IsOptional()
    @IsInt()
    maxGuests?: number

    @ApiProperty({ example: 4, required: false })
    @IsOptional()
    @IsInt()
    maxAdults?: number

    @ApiProperty({ example: 3, required: false })
    @IsOptional()
    @IsInt()
    maxChildren?: number

    @ApiProperty({ example: 300 })
    @IsDefined()
    weekdaysPrice!: number

    @ApiProperty({ example: 500 })
    @IsDefined()
    weekendPrice!: number

    @ApiProperty({ example: 50 })
    @IsDefined()
    extraAdultPrice!: number

    @ApiProperty({ example: 70 })
    @IsDefined()
    @IsInt()
    chargeExtraAdultHigherThan!: number

    @ApiProperty({ type: [HousingUnitDTO] })
    @IsDefined()
    @IsArray()
    @ValidateNested({ each: true })
    @Type(() => HousingUnitDTO)
    housingUnits!: HousingUnitDTO[]

    @ApiProperty({ type: [HousingUnitTypeFacilityDTO] })
    @IsDefined()
    @IsArray()
    @ValidateNested({ each: true })
    @Type(() => HousingUnitTypeFacilityDTO)
    facilities!: HousingUnitTypeFacilityDTO[]

    @ApiProperty({ type: [HousingUnitTypeMediaDTO] })
    @IsOptional()
    @IsArray()
    @ValidateNested({ each: true })
    @Type(() => HousingUnitTypeMediaDTO)
    medias?: HousingUnitTypeMediaDTO[]
}
