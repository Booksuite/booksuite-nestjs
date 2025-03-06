import { ApiProperty } from '@nestjs/swagger'
import { FacilityType } from '@prisma/client'
import { IsDefined, IsEnum } from 'class-validator'

export class FacilitySearchFilterDTO {
    @ApiProperty({ enum: FacilityType, example: FacilityType.COMPANY })
    @IsDefined()
    @IsEnum(FacilityType)
    type: FacilityType
}
