import { ApiProperty } from '@nestjs/swagger'
import { IsDefined, IsOptional, IsString } from 'class-validator'

export class BookingPolicyCrateDTO {
    @ApiProperty({ example: 'Age' })
    @IsOptional()
    @IsString()
    type?: string

    @ApiProperty({ example: 'age policy for children' })
    @IsDefined()
    @IsString()
    description!: string

    @ApiProperty({ example: '6ba7b810-9dad-11d1-80b4-00c04fd430c8' })
    @IsDefined()
    @IsString()
    companyId!: string
}
