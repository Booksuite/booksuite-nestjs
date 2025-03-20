import { ApiProperty } from '@nestjs/swagger'
import { Type } from 'class-transformer'
import {
    IsArray,
    IsBoolean,
    IsInt,
    IsOptional,
    IsString,
    ValidateNested,
} from 'class-validator'

import { HousingUnitDTO } from './HousingUnit.dto'
import { HousingUnitTypeFacilityDTO } from './HousingUnitTypeFacility.dto'
import { HousingUnitTypeMediaDTO } from './HousingUnitTypeMedia.dto'

export class HousingUnitTypeUpdateDTO {
    @ApiProperty({ example: 'Deluxe', required: false })
    @IsOptional()
    @IsString()
    name?: string

    @ApiProperty({ example: true, required: false })
    @IsOptional()
    @IsBoolean()
    published?: boolean

    @ApiProperty({ example: 'deluxe-suite', required: false })
    @IsOptional()
    @IsString()
    slug?: string

    @ApiProperty({
        example: 'a deluxe suite for 2 people',
        required: false,
        nullable: true,
    })
    @IsOptional()
    @IsString()
    shortDescription?: string | null

    @ApiProperty({
        example:
            'The Deluxe Suite offers a spacious room with a king-size bed, a private balcony, and premium amenities.',
        required: false,
        nullable: true,
    })
    @IsOptional()
    @IsString()
    description?: string | null

    @ApiProperty({ example: 2, required: false })
    @IsOptional()
    @IsInt()
    order?: number

    @ApiProperty({ example: 2, required: false, nullable: true })
    @IsOptional()
    @IsInt()
    minGuests?: number | null

    @ApiProperty({ example: 6, required: false, nullable: true })
    @IsOptional()
    @IsInt()
    maxGuests?: number | null

    @ApiProperty({ example: 4, required: false, nullable: true })
    @IsOptional()
    @IsInt()
    maxAdults?: number | null

    @ApiProperty({ example: 3, required: false, nullable: true })
    @IsOptional()
    @IsInt()
    maxChildren?: number | null

    @ApiProperty({ example: 300, required: false })
    @IsOptional()
    weekdaysPrice?: number

    @ApiProperty({ example: 500, required: false })
    @IsOptional()
    weekendPrice?: number

    @ApiProperty({ example: 50, required: false })
    @IsOptional()
    extraAdultPrice?: number

    @ApiProperty({ example: 70, required: false })
    @IsOptional()
    @IsInt()
    chargeExtraAdultHigherThan?: number

    @ApiProperty({ type: [HousingUnitDTO], required: false })
    @IsOptional()
    @IsArray()
    @ValidateNested({ each: true })
    @Type(() => HousingUnitDTO)
    housingUnits?: HousingUnitDTO[]

    @ApiProperty({ type: [HousingUnitTypeFacilityDTO], required: false })
    @IsOptional()
    @IsArray()
    @ValidateNested({ each: true })
    @Type(() => HousingUnitTypeFacilityDTO)
    facilities?: HousingUnitTypeFacilityDTO[]

    @ApiProperty({ type: [HousingUnitTypeMediaDTO], required: false })
    @IsOptional()
    @IsArray()
    @ValidateNested({ each: true })
    @Type(() => HousingUnitTypeMediaDTO)
    medias?: HousingUnitTypeMediaDTO[]
}
