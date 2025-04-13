import { ApiProperty } from '@nestjs/swagger'
import { IsDateString, IsDefined } from 'class-validator'

export class DateRangeDTO {
    @ApiProperty({
        type: String,
        format: 'date',
        example: '2025-03-01',
    })
    @IsDefined()
    @IsDateString()
    start: string

    @ApiProperty({
        type: String,
        format: 'date',
        example: '2025-03-14',
    })
    @IsDefined()
    @IsDateString()
    end: string
}
