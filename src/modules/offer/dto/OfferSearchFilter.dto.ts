import { ApiProperty } from '@nestjs/swagger'
import { Transform } from 'class-transformer'
import { IsBoolean, IsOptional, IsString } from 'class-validator'

export class OfferSearchFilterDTO {
    @ApiProperty({ required: false, type: Boolean })
    @IsBoolean()
    @IsOptional()
    @Transform(({ value }) => value === 'true')
    published?: boolean

    @ApiProperty({ required: false })
    @IsString()
    @IsOptional()
    companyId?: string
}
