import { ApiProperty } from '@nestjs/swagger'
import { IsDefined, IsString } from 'class-validator'

export class HousingUnitDTO {
    @ApiProperty({ example: '204' })
    @IsDefined()
    @IsString()
    name!: string

    @ApiProperty({ example: '6ba7b810-9dad-11d1-80b4-00c04fd430c8' })
    @IsDefined()
    @IsString()
    housingUnitTypeId!: string
}
