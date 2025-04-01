import { ApiProperty } from '@nestjs/swagger'
import { Type } from 'class-transformer'
import { IsArray, IsDefined, ValidateNested } from 'class-validator'

import { SeasonRuleHousingUnitTypeResponseDTO } from './SeasonRulesHousingUnitTypeResponse.dto'
import { SeasonRulesResponseDTO } from './SeasonRulesResponse.dto'

export class SeasonRulesResponseFullDTO extends SeasonRulesResponseDTO {
    @ApiProperty({ type: [SeasonRuleHousingUnitTypeResponseDTO] })
    @IsDefined()
    @IsArray()
    @ValidateNested()
    @Type(() => SeasonRuleHousingUnitTypeResponseDTO)
    housingUnitTypesPrices: SeasonRuleHousingUnitTypeResponseDTO[]
}
