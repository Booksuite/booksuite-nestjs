import { ApiProperty } from '@nestjs/swagger'
import { BillingType } from '@prisma/client'

import { MediaResponseDTO } from '@/modules/media/dto/MediaResponse.dto'

export class ServiceResponseDTO {
    @ApiProperty({ example: 'M8c8ab0cb-7689-4357-b446-1348cfe3842d' })
    id!: string

    @ApiProperty({ example: 'Massage' })
    name!: string

    @ApiProperty({ example: true })
    published!: boolean

    @ApiProperty({
        enum: BillingType,
        enumName: 'BillingType',
        example: 'PER_GUEST_DAILY',
    })
    billingType!: BillingType

    @ApiProperty({ example: 200 })
    price!: number

    @ApiProperty({ example: 3 })
    adults!: number

    @ApiProperty({ example: 1 })
    minDaily!: number

    @ApiProperty({ example: 1 })
    minNotice!: number

    @ApiProperty({ example: true })
    onlineSale!: boolean

    @ApiProperty({ example: false })
    panelSale!: boolean

    @ApiProperty({ example: true })
    seasonalSale!: boolean

    @ApiProperty({ example: '2025-02-21T14:30:00.000Z' })
    seasonStart!: Date

    @ApiProperty({ example: '2025-02-22T14:30:00.000Z' })
    seasonEnd!: Date

    @ApiProperty({
        example: 'Enjoy a soothing massage during your stay',
    })
    description!: string

    @ApiProperty({ example: 'Free Wi-Fi, Breakfast, Swimming Pool Access' })
    included!: string

    @ApiProperty({ example: 'Seasonal availability, blackout dates apply.' })
    notes!: string

    @ApiProperty({ type: Number, isArray: true })
    availableWeekDays: PrismaJson.WeekDays | null

    @ApiProperty({
        nullable: true,
        type: MediaResponseDTO,
    })
    coverMedia?: MediaResponseDTO
}
