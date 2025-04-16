import { ApiProperty } from '@nestjs/swagger'
import { BillingType } from '@prisma/client'

export class TariffOptionResponseDTO {
    @ApiProperty({ example: 'e95517fb-b3bb-492f-b605-d289704cde0e' })
    id: string

    @ApiProperty({ example: 'Standard Reservation' })
    name: string

    @ApiProperty({ example: true, type: Boolean })
    published: boolean

    @ApiProperty({
        enum: BillingType,
        enumName: 'BillingType',
        example: BillingType.DAILY,
    })
    billingType: BillingType

    @ApiProperty({ example: 20.5 })
    additionalAdultPrice: number

    @ApiProperty({ example: 10.0 })
    additionalChildrenPrice: number

    @ApiProperty({ example: '[0,1,2]', type: Number, isArray: true })
    availableWeekend: PrismaJson.WeekDays

    @ApiProperty({ example: '[Café, Almoço]' })
    includedItems: PrismaJson.IncludedItems
}
