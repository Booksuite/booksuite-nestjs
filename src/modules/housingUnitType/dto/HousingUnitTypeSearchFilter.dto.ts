import { ApiProperty } from '@nestjs/swagger'
import { IsBoolean, IsDefined } from 'class-validator'

export class HousingUnitTypeSearchFilterDTO {
    @ApiProperty({ example: true })
    @IsDefined()
    @IsBoolean()
    published: boolean
}
