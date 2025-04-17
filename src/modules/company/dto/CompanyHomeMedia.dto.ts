import { ApiProperty } from '@nestjs/swagger'
import { IsDefined, IsNumber, IsString } from 'class-validator'

export class CompanyHomeMediaDTO {
    @ApiProperty({
        example: 'e23d2e3e-6bf9-4b7c-8aec-73c37a5b9d8f',
        type: String,
    })
    @IsString()
    @IsDefined()
    mediaId: string

    @ApiProperty({ example: 1, type: Number })
    @IsNumber()
    @IsDefined()
    order: number
}
