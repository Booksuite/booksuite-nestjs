import { ApiProperty } from '@nestjs/swagger'
import { IsOptional, IsString } from 'class-validator'

export class CompanySearchFilterDTO {
    @ApiProperty({ example: 'published' })
    @IsOptional()
    @IsString()
    published?: string
}
