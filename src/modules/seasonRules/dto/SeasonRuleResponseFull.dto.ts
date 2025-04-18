import { ApiProperty } from '@nestjs/swagger'

import { HousingUnitTypePricingChangeDTO } from '@/common/dto/HousingUnitTypePricingChange.dto'

import { SeasonRuleResponseDTO } from './SeasonRuleResponse.dto'

export class SeasonRuleResponseFullDTO extends SeasonRuleResponseDTO {
    @ApiProperty({ type: [HousingUnitTypePricingChangeDTO] })
    housingUnitTypePrices: HousingUnitTypePricingChangeDTO[]
}
