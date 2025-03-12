import { ApiProperty } from '@nestjs/swagger'
import { FacilityType } from '@prisma/client'
import { IsEnum, IsOptional } from 'class-validator'

export class FacilitySearchFilterDTO {
    @ApiProperty({
        enum: FacilityType,
        example: FacilityType.COMPANY,
        required: false,
    })
    @IsOptional()
    @IsEnum(FacilityType)
    type?: FacilityType
}
