import { ApiProperty } from '@nestjs/swagger'
import { ReservationDepositType } from '@prisma/client'

import { InstallmentsTaxDTO } from './InstallmentsTax.dto'

export class PaymentMethodsResponseDTO {
    @ApiProperty({ example: 'e95517fb-b3bb-492f-b605-d289704cde0e' })
    id: string

    @ApiProperty({ enum: ReservationDepositType })
    guaranteeType: ReservationDepositType

    @ApiProperty({ example: 15.5 })
    percentageChargedValue!: number

    @ApiProperty({ example: true, required: false })
    pix: boolean | null

    @ApiProperty({ example: 5.0, required: false })
    pixDiscount: number | null

    @ApiProperty({ example: true, required: false })
    creditCard: boolean | null

    @ApiProperty({ example: 12, required: false })
    installmentsMaxNumber: number | null

    @ApiProperty({ example: 50.0, required: false })
    InstallmentsMinValue: number | null

    @ApiProperty({ type: [InstallmentsTaxDTO], required: false })
    installments: InstallmentsTaxDTO[] | null

    @ApiProperty({ example: true, required: false })
    debitCard: boolean | null

    @ApiProperty({ example: 3.0, required: false })
    debitCardDiscount: number | null

    @ApiProperty({ example: true, required: false })
    onHotel: boolean | null

    @ApiProperty({ example: 2.5, required: false })
    onHotelDiscount: number | null
}
