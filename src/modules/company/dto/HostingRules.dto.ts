import { ApiProperty } from '@nestjs/swagger'
import { IsDateString, IsDefined, IsInt, IsOptional } from 'class-validator'

import { IsWeekDays } from '@/common/decorators/IsWeekDays.decorator'

export class HostingRulesDTO {
    @ApiProperty({ example: 14 })
    @IsInt()
    checkIn: number

    @ApiProperty({ example: 12 })
    @IsInt()
    checkOut: number

    @ApiProperty({ example: 2 })
    @IsInt()
    minDaily: number

    @ApiProperty({ example: 120, type: Number })
    fixedWindowPeriod: number

    @ApiProperty({ type: Number, isArray: true })
    @IsDefined()
    @IsWeekDays()
    availableWeekend: PrismaJson.WeekDays

    @ApiProperty({ example: '2025-12-01' })
    @IsDateString()
    @IsOptional()
    reservationWindowStart?: string

    @ApiProperty({ example: '2025-12-31' })
    @IsDateString()
    @IsOptional()
    reservationWindowEnd?: string

    @ApiProperty({ type: Number, isArray: true })
    @IsDefined()
    @IsWeekDays()
    availableWeekDays: PrismaJson.WeekDays
}
