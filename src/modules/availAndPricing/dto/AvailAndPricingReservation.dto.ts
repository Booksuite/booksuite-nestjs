import { OmitType } from '@nestjs/swagger'

import { ReservationResponseFullDTO } from '@/modules/reservation/dto/ReservationResponseFull.dto'
import { AvailAndPricingReservation } from '../types'

export class AvailAndPricingReservationDTO
    extends OmitType(ReservationResponseFullDTO, [
        'sellerUser',
        'ageGroups',
        'services',
        'rateOption',
    ])
    implements AvailAndPricingReservation {
    // finalReservationPrice: number
    // @ApiProperty({
    //     description: 'The ID of the reservation',
    //     example: '123e4567-e89b-12d3-a456-426614174000',
    // })
    // @ApiProperty({
    //     description: 'The rate option ID of the reservation',
    //     example: '123e4567-e89b-12d3-a456-426614174000',
    //     nullable: true,
    //     type: String,
    // })
    // rateOptionId: string | null
    // @ApiProperty({
    //     enum: ReservationStatus,
    //     enumName: 'ReservationStatus',
    //     description: 'The status of the reservation',
    //     example: ReservationStatus.CONFIRMED,
    // })
    // status: ReservationStatus
    // @ApiProperty({
    //     description: 'The notes of the reservation',
    //     example: 'This is a note',
    // })
    // notes: string
    // @ApiProperty({
    //     description: 'The reservation code',
    //     example: '123e4567-e89b-12d3-a456-426614174000',
    // })
    // reservationCode: string
    // @ApiProperty({
    //     description: 'The start date of the reservation',
    //     type: Date,
    //     format: 'date',
    //     example: '2021-01-01',
    // })
    // startDate: string
    // @ApiProperty({
    //     description: 'The end date of the reservation',
    //     type: Date,
    //     format: 'date',
    //     example: '2021-01-01',
    // })
    // endDate: string
    // @ApiProperty({
    //     description: 'The total days of the reservation',
    //     example: 1,
    //     type: Number,
    //     nullable: true,
    // })
    // totalDays: number | null
    // @ApiProperty({
    //     description: 'Reservation FinalPrice',
    //     example: 1,
    //     type: Number,
    //     nullable: true,
    // })
    // finalPrice: number
    // @ApiProperty({
    //     description: 'The adults of the reservation',
    //     example: 1,
    // })
    // adults: number
    // @ApiProperty({
    //     enum: ReservationSaleChannel,
    //     enumName: 'ReservationSaleChannel',
    //     description: 'The sale channel of the reservation',
    //     example: ReservationSaleChannel.BOOKSUITE,
    // })
    // saleChannel: ReservationSaleChannel
    // @ApiProperty({
    //     description: 'The seller user ID of the reservation',
    //     example: '123e4567-e89b-12d3-a456-426614174000',
    //     nullable: true,
    //     type: String,
    // })
    // sellerUserId: string | null
    // @ApiProperty({
    //     description: 'The guest user ID of the reservation',
    //     example: '123e4567-e89b-12d3-a456-426614174000',
    //     nullable: true,
    //     type: String,
    // })
    // guestUserId: string | null
    // @ApiProperty({
    //     description: 'The company ID of the reservation',
    //     example: '123e4567-e89b-12d3-a456-426614174000',
    // })
    // companyId: string
    // @ApiProperty({
    //     description: 'The housing unit ID of the reservation',
    //     example: '123e4567-e89b-12d3-a456-426614174000',
    //     nullable: true,
    //     type: String,
    // })
    // housingUnitId: string | null
    // @ApiProperty({
    //     description: 'The created at date of the reservation',
    //     example: '2021-01-01',
    // })
    // createdAt: Date
    // @ApiProperty({
    //     description: 'The updated at date of the reservation',
    //     example: '2021-01-01',
    // })
    // updatedAt: Date
    // @ApiProperty({
    //     description: 'The deleted at date of the reservation',
    //     example: '2021-01-01',
    //     nullable: true,
    //     type: Date,
    //     format: 'date-time',
    // })
    // deletedAt: Date | null
    // @ApiProperty({
    //     description: 'The user ID of the reservation',
    //     example: '123e4567-e89b-12d3-a456-426614174000',
    //     nullable: true,
    //     type: String,
    // })
    // userId: string | null
    // @ApiProperty({
    //     description: 'The housing unit of the reservation',
    //     type: HousingUnitResponseDTO,
    //     nullable: true,
    // })
    // housingUnit: HousingUnitResponseDTO | null
    // @ApiProperty({
    //     description: 'The guest user of the reservation',
    //     type: UserResponseDTO,
    //     nullable: true,
    // })
    // guestUser: UserResponseDTO | null
}
