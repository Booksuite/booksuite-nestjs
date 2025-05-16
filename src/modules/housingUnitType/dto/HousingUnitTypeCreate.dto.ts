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

    @ApiProperty({
        example: 'a deluxe suite for 2 people',
        type: String,
        nullable: true,
    })
    @IsString()
    @IsOptional()
    shortDescription: string | null

    @ApiProperty({
        example:
            'The Deluxe Suite offers a spacious room with a king-size bed, a private balcony, and premium amenities.',
        type: String,
        nullable: true,
    })
    @IsOptional()
    @IsString()
    description: string | null

    @ApiProperty({ example: 2 })
    @IsDefined()
    @IsInt()
    order!: number

    @ApiProperty({ example: 2, type: Number, nullable: true })
    @IsOptional()
    @IsInt()
    minGuests: number | null

    @ApiProperty({ example: 6, type: Number, nullable: true })
    @IsOptional()
    @IsInt()
    maxGuests: number | null

    @ApiProperty({ example: 4, type: Number, nullable: true })
    @IsOptional()
    @IsInt()
    maxAdults: number | null

    @ApiProperty({ example: 3, type: Number, nullable: true })
    @IsOptional()
    @IsInt()
    maxChildren: number | null

    @ApiProperty({ example: 300, type: Number })
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
