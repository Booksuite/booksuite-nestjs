import { ApiProperty } from '@nestjs/swagger'

import { SeasonRuleHousingUnitTypeResponseDTO } from './SeasonRuleHousingUnitTypeResponse.dto'
import { SeasonRuleResponseDTO } from './SeasonRuleResponse.dto'

export class SeasonRuleResponseFullDTO extends SeasonRuleResponseDTO {
    @ApiProperty({ type: [SeasonRuleHousingUnitTypeResponseDTO] })
    housingUnitTypesPrices: SeasonRuleHousingUnitTypeResponseDTO[]
}
