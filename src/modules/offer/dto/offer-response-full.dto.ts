import { ApiProperty } from '@nestjs/swagger'

import { OfferResponseDTO } from './offer-response.dto'
import { OfferHousingUnitTypeResponseDTO } from './OfferHousingUnitTypeResponse.dto'
import { OfferPaymentMethodResponseDTO } from './OfferPaymentMethodResponse.dto'
import { OfferServiceResponseDTO } from './OfferServiceResponse.dto'

export class OfferResponseFullDTO extends OfferResponseDTO {
    @ApiProperty({ type: [OfferHousingUnitTypeResponseDTO] })
    availableHousingUnitTypes: OfferHousingUnitTypeResponseDTO[]

    @ApiProperty({ type: [OfferPaymentMethodResponseDTO] })
    validPaymentMethods: OfferPaymentMethodResponseDTO[]

    @ApiProperty({ type: [OfferServiceResponseDTO] })
    validServices: OfferServiceResponseDTO[]
}
