import { ApiProperty } from '@nestjs/swagger'
import { HostingWindowType } from '@prisma/client'

export class HostingRulesResponseDTO {
    @ApiProperty({ example: 'e95517fb-b3bb-492f-b605-d289704cde0e' })
    id: string

    @ApiProperty({ example: 14 })
    checkIn: number

    @ApiProperty({ example: 12 })
    checkOut: number

    @ApiProperty({ example: 2 })
    minDaily: number

    @ApiProperty({
        example: HostingWindowType.DYNAMIC,
        enum: HostingWindowType,
    })
    hostingWindowType: HostingWindowType

    @ApiProperty({ example: 120, type: Number })
    period: number

    @ApiProperty({ example: 90, type: Number })
    openWindowDays: number

    @ApiProperty({ type: Number, isArray: true })
    availableWeekend: PrismaJson.WeekDays

    @ApiProperty({ example: '2025-12-01' })
    fixedStart: string

    @ApiProperty({ example: '2025-12-31' })
    fixedEnd: string

    @ApiProperty({ type: Number, isArray: true })
    availableWeekDays: PrismaJson.WeekDays
}
