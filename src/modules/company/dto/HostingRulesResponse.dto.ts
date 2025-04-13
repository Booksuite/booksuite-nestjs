import { ApiProperty } from '@nestjs/swagger'

export class HostingRulesResponseDTO {
    @ApiProperty({ example: 'e95517fb-b3bb-492f-b605-d289704cde0e' })
    id: string

    @ApiProperty({ example: 14 })
    checkIn: number

    @ApiProperty({ example: 12 })
    checkOut: number

    @ApiProperty({ example: 2 })
    minDaily: number

    @ApiProperty({ example: 120, type: Number })
    fixedWindowPeriod: number

    @ApiProperty({ type: Number, isArray: true })
    availableWeekend: PrismaJson.WeekDays

    @ApiProperty({ example: '2025-12-01', type: String, nullable: true })
    reservationWindowStart: string | null

    @ApiProperty({ example: '2025-12-31', type: String, nullable: true })
    reservationWindowEnd: string | null

    @ApiProperty({ type: Number, isArray: true })
    availableWeekDays: PrismaJson.WeekDays
}
