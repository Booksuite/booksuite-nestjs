import { withPaginatedResponse } from '@/common/dto/PaginatedResponse.dto'

import { SeasonRuleResponseFullDTO } from './SeasonRuleResponseFull.dto'

export class SeasonRulePaginatedResponseDTO extends withPaginatedResponse(
    SeasonRuleResponseFullDTO,
) {}
