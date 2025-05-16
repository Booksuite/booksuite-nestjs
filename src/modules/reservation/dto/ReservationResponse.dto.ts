import { ApiProperty } from '@nestjs/swagger'
import { ReservationSaleChannel, ReservationStatus } from '@prisma/client'

import { ReservationSummaryDTO } from '@/modules/availAndPricing/dto/ReservationSummary.dto'
import { HousingUnitResponseDTO } from '@/modules/housingUnitType/dto/HousingUnitResponse.dto'
import { UserResponseDTO } from '@/modules/user/dto/UserCreateResponse.dto'

export class ReservationResponseDTO {
    @ApiProperty({
        example: '123e4567-e89b-12d3-a456-426614174000',
    })
    id!: string

    @ApiProperty({
        enum: ReservationStatus,
        example: ReservationStatus.CONFIRMED,
    })
    status!: ReservationStatus

    @ApiProperty({
        example: '2025-01-14',
        type: String,
        format: 'date',
        nullable: true,
    })
    preOrderExpiraiton!: string | null

    @ApiProperty({
        type: () => ReservationSummaryDTO,
    })
    summary: ReservationSummaryDTO

    @ApiProperty({
        enum: ReservationSaleChannel,
        example: ReservationSaleChannel.BOOKSUITE,
    })
    saleChannel: ReservationSaleChannel

    @ApiProperty({ example: '2024-10-17', type: String, format: 'date' })
    startDate!: string

    @ApiProperty({ example: '2025-10-20', type: String, format: 'date' })
    endDate!: string

    @ApiProperty({ example: 2, type: Number })
    adults!: number

    @ApiProperty({ example: 'Featured booking' })
    notes!: string

    @ApiProperty({ example: '2024-07-19T13:19:15.271637Z' })
    createdAt!: Date

    @ApiProperty({ example: '2024-07-29T13:19:15.271631Z' })
    updatedAt!: Date

    @ApiProperty({ example: '123e4567-e89b-12d3-a456-426614174000' })
    reservationCode!: string

    @ApiProperty({
        example: '123e4567-e89b-12d3-a456-426614174000',
        nullable: true,
        type: String,
    })
    sellerUserId: string | null

    @ApiProperty({
        example: '123e4567-e89b-12d3-a456-426614174000',
    })
    guestUserId: string

    @ApiProperty({ example: '123e4567-e89b-12d3-a456-426614174000' })
    companyId!: string

    @ApiProperty({
        example: '123e4567-e89b-12d3-a456-426614174000',
        nullable: true,
        type: String,
    })
    housingUnitId: string | null

    @ApiProperty({
        example: '123e4567-e89b-12d3-a456-426614174000',
        nullable: true,
        type: String,
    })
    housingUnitTypeId: string | null

    @ApiProperty({
        example: '123e4567-e89b-12d3-a456-426614174000',
        nullable: true,
        type: String,
    })
    rateOptionId: string | null

    @ApiProperty({
        example: '2024-07-29T13:19:15.271631Z',
        type: Date,
        nullable: true,
    })
    deletedAt: Date | null

    @ApiProperty({ type: HousingUnitResponseDTO, nullable: true })
    housingUnit!: HousingUnitResponseDTO | null

    @ApiProperty({ type: UserResponseDTO })
    guestUser: UserResponseDTO
}
