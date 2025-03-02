import { ApiProperty } from '@nestjs/swagger'

import { CancellationPolicyResponseDTO } from './CancellationPolicyResponse.dto'
import { PenaltyRangeResponseDTO } from './PenaltyRangeResponse.dto'

export class CancellationPolicyResponseFullDTO extends CancellationPolicyResponseDTO {
    @ApiProperty({
        type: [PenaltyRangeResponseDTO],
    })
    penaltyRanges!: PenaltyRangeResponseDTO[]
}
