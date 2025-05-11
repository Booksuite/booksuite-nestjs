import { ApiProperty } from '@nestjs/swagger'
import { IsArray, IsBoolean, IsOptional, IsUUID } from 'class-validator'

export class ServiceSearchFilterDTO {
    @ApiProperty({ example: true, required: false })
    @IsOptional()
    @IsBoolean()
    published?: boolean

    @ApiProperty({
        example: ['f47ac10b-58cc-4372-a567-0e02b2c3d479'],
        required: false,
    })
    @IsOptional()
    @IsArray()
    @IsUUID('4', { each: true })
    housingUnitTypeIds?: string[]
}
