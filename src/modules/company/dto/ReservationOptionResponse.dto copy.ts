import { ApiProperty } from '@nestjs/swagger'
import { BillingType } from '@prisma/client'

export class ReservationOptionResponseDTO {
    @ApiProperty({ example: 'e95517fb-b3bb-492f-b605-d289704cde0e' })
    id: string

    @ApiProperty({ example: 'Standard Reservation' })
    name: string

    @ApiProperty({ enum: BillingType })
    billingType: BillingType

    @ApiProperty({ example: 20.5 })
    additionalAdultPrice: number

    @ApiProperty({ example: 10.0 })
    additionalChildrenPrice: number

    @ApiProperty({ example: '{ "friday": true, "saturday": true }' })
    availableWeekend: object

    @ApiProperty({ example: '[Café, Almoço]' })
    includedItems: PrismaJson.includedItems
}
