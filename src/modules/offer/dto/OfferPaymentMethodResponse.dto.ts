import { ApiProperty } from '@nestjs/swagger'

import { PaymentMethodResponseDTO } from '../../paymentMethod/dto/PaymentMethodResponse.dto'

export class OfferPaymentMethodResponseDTO {
    @ApiProperty({ example: '550e8400-e29b-41d4-a716-446655440000' })
    id: string

    @ApiProperty({ type: PaymentMethodResponseDTO })
    paymentMethod: PaymentMethodResponseDTO
}
