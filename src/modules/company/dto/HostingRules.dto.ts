import { ApiProperty } from '@nestjs/swagger'
import { HostingWindowType, Period } from '@prisma/client'
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

    @ApiProperty({
        example: HostingWindowType.DYNAMIC,
        enum: HostingWindowType,
    })
    hostingWindowType: HostingWindowType

    @ApiProperty({ example: Period.ONE_YEAR, enum: Period })
    period: Period

    @ApiProperty({ example: 90, type: Number })
    openWindowDays: number

    @ApiProperty({ type: Number, isArray: true })
    @IsDefined()
    @IsWeekDays()
    availableWeekend: PrismaJson.WeekDays

    @ApiProperty({ example: '2025-12-01' })
    @IsDateString()
    @IsOptional()
    seasonStart?: Date

    @ApiProperty({ example: '2025-12-31' })
    @IsDateString()
    @IsOptional()
    seasonEnd?: Date

    @ApiProperty({ type: Number, isArray: true })
    @IsDefined()
    @IsWeekDays()
    availableWeekDays: PrismaJson.WeekDays
}
