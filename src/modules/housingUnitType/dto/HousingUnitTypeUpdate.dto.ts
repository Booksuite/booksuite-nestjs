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
    @ApiProperty({ example: 'Deluxe', required: false, type: String })
    @IsOptional()
    @IsString()
    name?: string

    @ApiProperty({ example: true, required: false, type: Boolean })
    @IsOptional()
    @IsBoolean()
    published?: boolean

    @ApiProperty({ example: 'deluxe-suite', required: false, type: String })
    @IsOptional()
    @IsString()
    slug?: string

    @ApiProperty({
        example: 'a deluxe suite for 2 people',
        required: false,
        nullable: true,
        type: String,
    })
    @IsOptional()
    @IsString()
    shortDescription?: string | null

    @ApiProperty({
        example:
            'The Deluxe Suite offers a spacious room with a king-size bed, a private balcony, and premium amenities.',
        required: false,
        nullable: true,
        type: String,
    })
    @IsOptional()
    @IsString()
    description?: string | null

    @ApiProperty({ example: 2, required: false, type: Number })
    @IsOptional()
    @IsInt()
    order?: number

    @ApiProperty({ example: 2, required: false, nullable: true, type: Number })
    @IsOptional()
    @IsInt()
    minGuests?: number | null

    @ApiProperty({ example: 6, required: false, nullable: true, type: Number })
    @IsOptional()
    @IsInt()
    maxGuests?: number | null

    @ApiProperty({ example: 4, required: false, nullable: true, type: Number })
    @IsOptional()
    @IsInt()
    maxAdults?: number | null

    @ApiProperty({ example: 3, required: false, nullable: true, type: Number })
    @IsOptional()
    @IsInt()
    maxChildren?: number | null

    @ApiProperty({ example: 300, required: false, type: Number })
    @IsOptional()
    weekdaysPrice?: number

    @ApiProperty({ example: 500, required: false, type: Number })
    @IsOptional()
    weekendPrice?: number

    @ApiProperty({ example: 50, required: false, type: Number })
    @IsOptional()
    extraAdultPrice?: number

    @ApiProperty({ example: 70, required: false, type: Number })
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
