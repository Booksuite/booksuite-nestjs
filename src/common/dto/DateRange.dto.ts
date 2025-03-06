import { ApiProperty } from '@nestjs/swagger'
import { IsDefined, IsISO8601 } from 'class-validator'

export class DateRangeDTO {
    @ApiProperty({
        type: String,
        format: 'date',
        example: '2025-03-01T00:00:00Z',
    })
    @IsDefined()
    @IsISO8601({ strict: true })
    start: string

    @ApiProperty({
        type: String,
        format: 'date',
        example: '2025-03-14T00:00:00Z',
    })
    @IsDefined()
    @IsISO8601({ strict: true })
    end: string
}
