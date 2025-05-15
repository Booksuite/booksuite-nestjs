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
    minStay: number

    @ApiProperty({ example: 120, type: Number })
    fixedWindowPeriod: number

    @ApiProperty({ type: Number, isArray: true })
    @IsDefined()
    @IsWeekDays()
    availableWeekend: PrismaJson.WeekDays

    @ApiProperty({ example: '2025-12-01', type: String, nullable: true })
    @IsDateString()
    @IsOptional()
    reservationWindowStart: string | null

    @ApiProperty({ example: '2025-12-31', type: String, nullable: true })
    @IsDateString()
    @IsOptional()
    reservationWindowEnd: string | null

    @ApiProperty({ type: Number, isArray: true })
    @IsDefined()
    @IsWeekDays()
    availableWeekDays: PrismaJson.WeekDays
}
