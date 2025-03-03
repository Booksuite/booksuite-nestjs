import { ApiProperty } from '@nestjs/swagger'

import { FacilityDTO } from '@/modules/facility/dto/Facility.dto'

export class CompanyFacilityResponseDTO {
    @ApiProperty({ example: 'bcd82497-2cc3-4998-b3d9-99db2f56b159' })
    id!: string

    @ApiProperty({ example: '2025-02-28T12:30:00.000Z' })
    updatedAt!: Date

    @ApiProperty({ type: FacilityDTO })
    facility: FacilityDTO
}
