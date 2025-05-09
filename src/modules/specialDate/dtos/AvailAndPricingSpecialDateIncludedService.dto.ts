import { OmitType } from '@nestjs/swagger'

import { SpecialDateServiceResponseDTO } from '@/modules/specialDate/dtos/SpecialDateServiceResponse.dto'

export class AvailAndPricingSpecialDateIncludedServiceDTO extends OmitType(
    SpecialDateServiceResponseDTO,
    ['service'],
) {}
