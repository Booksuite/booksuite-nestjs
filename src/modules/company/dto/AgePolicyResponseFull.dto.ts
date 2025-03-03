import { ApiProperty } from '@nestjs/swagger'

import { AgeGroupResponseDTO } from './AgeGroupResponse.dto'
import { AgePolicyResponseDTO } from './AgePolicyResponse.dto'

export class AgePolicyResponseFullDTO extends AgePolicyResponseDTO {
    @ApiProperty({ type: [AgeGroupResponseDTO] })
    ageGroups!: AgeGroupResponseDTO[]
}
