import { ApiProperty } from '@nestjs/swagger'
import { IsOptional, IsString } from 'class-validator'

export class CompanyQueryDTO {
    @ApiProperty({ example: 'Company name', required: false })
    @IsOptional()
    @IsString()
    name?: string

    @ApiProperty({ example: 'Company short Description', required: false })
    @IsOptional()
    @IsString()
    shortDescription?: string

    @ApiProperty({ example: 'Company Description', required: false })
    @IsOptional()
    @IsString()
    description?: string

    @ApiProperty({ example: 'Company legal name', required: false })
    @IsOptional()
    @IsString()
    companyName?: string

    @ApiProperty({ example: 'State', required: false })
    @IsOptional()
    @IsString()
    state?: string

    @ApiProperty({ example: 'City', required: false })
    @IsOptional()
    @IsString()
    city?: string
}
