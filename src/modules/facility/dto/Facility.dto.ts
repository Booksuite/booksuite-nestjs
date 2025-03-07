import { ApiProperty } from '@nestjs/swagger'
import { FacilityCategory, FacilityType } from '@prisma/client'
import {
    IsDefined,
    IsEnum,
    IsOptional,
    IsString,
    IsUUID,
} from 'class-validator'

export class FacilityDTO {
    @ApiProperty({
        example: '123e4567-e89b-12d3-a456-426614174000',
        required: false,
    })
    @IsOptional()
    @IsUUID()
    id?: string

    @ApiProperty({
        enum: FacilityType,
        example: FacilityType.HOUSING_UNIT_TYPE,
    })
    @IsDefined()
    @IsEnum(FacilityType)
    type!: FacilityType

    @ApiProperty({
        enum: FacilityCategory,
        example: FacilityCategory.GENERAL,
    })
    @IsDefined()
    @IsEnum(FacilityCategory)
    category!: FacilityCategory

    @ApiProperty({ example: 'WiFi' })
    @IsDefined()
    @IsString()
    name!: string

    @ApiProperty({ example: 'wifi-icon', required: false })
    @IsDefined()
    @IsString()
    icon?: string | null
}
