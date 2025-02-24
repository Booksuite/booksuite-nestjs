import { ApiProperty } from '@nestjs/swagger'
import { IsBoolean, IsOptional } from 'class-validator'

import { FacilityDTO } from '@/modules/facility/dto/Facility.dto'

export class HousingUnitTypeFacilityDTO extends FacilityDTO {
    @ApiProperty({ example: true, required: false })
    @IsOptional()
    @IsBoolean()
    isFeatured?: boolean
}
