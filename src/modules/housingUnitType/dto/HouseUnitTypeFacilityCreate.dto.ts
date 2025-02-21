import { ApiProperty } from '@nestjs/swagger'
import { IsBoolean, IsDefined, IsOptional, IsString } from 'class-validator'

export class HouseUnitTypeFacilityCreateDTO {
    @ApiProperty({ example: 'true', required: false })
    @IsOptional()
    @IsBoolean()
    isFeatured?: boolean

    @ApiProperty({ example: '6ba7b810-9dad-11d1-80b4-00c04fd430c8' })
    @IsDefined()
    @IsString()
    housingUnitTypeId!: string

    @ApiProperty({ example: 'f47ac10b-58cc-4372-a567-0e02b2c3d479' })
    @IsDefined()
    @IsString()
    facilityId!: string
}
