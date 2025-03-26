import { ApiProperty } from '@nestjs/swagger'
import {
    IsBoolean,
    IsDefined,
    IsInt,
    IsOptional,
    IsUUID,
} from 'class-validator'

export class HousingUnitTypeFacilityDTO {
    @ApiProperty({ example: true, required: false })
    @IsOptional()
    @IsBoolean()
    isFeatured?: boolean

    @ApiProperty({ example: '123e4567-e89b-12d3-a456-426614174000' })
    @IsDefined()
    @IsUUID()
    facilityId: string

    @ApiProperty({ example: 1, required: false })
    @IsOptional()
    @IsInt()
    order?: number
}
