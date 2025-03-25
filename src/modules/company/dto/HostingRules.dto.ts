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

    @ApiProperty({ type: Number, isArray: true })
    @IsDefined()
    @IsWeekDays()
    availableWeekend: PrismaJson.WeekDays

    @ApiProperty({ example: '2025-12-01' })
    @IsDateString()
    seasonStart: Date

    @ApiProperty({ example: '2025-12-31' })
    @IsDateString()
    seasonEnd: Date

    @ApiProperty({ example: true })
    @IsOptional()
    hostingOnSpecificDays: boolean

    @ApiProperty({ type: Number, isArray: true })
    @IsDefined()
    @IsWeekDays()
    availableWeekDays: PrismaJson.WeekDays
}
