import { ApiProperty } from '@nestjs/swagger'
import { IsOptional, IsString } from 'class-validator'

export class CompanySearchFilterDTO {
    @ApiProperty({ example: true })
    @IsOptional()
    @IsString()
    published?: boolean

    @ApiProperty({ example: '8e5a06a3-da2e-4edc-8a54-bea322cb10b1' })
    @IsOptional()
    @IsString()
    userId?: string
}
