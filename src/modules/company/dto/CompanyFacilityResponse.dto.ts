import { ApiProperty } from '@nestjs/swagger'

import { FacilityResponseDTO } from '@/modules/facility/dto/FacilityResponse.dto'

export class CompanyFacilityResponseDTO {
    @ApiProperty({ example: 'bcd82497-2cc3-4998-b3d9-99db2f56b159' })
    id!: string

    @ApiProperty({ example: 1, nullable: true, type: Number })
    order: number | null

    @ApiProperty({ type: FacilityResponseDTO })
    facility: FacilityResponseDTO

    @ApiProperty({ example: '2025-02-28T12:30:00.000Z' })
    createdAt!: Date
}
