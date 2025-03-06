import { ApiProperty } from '@nestjs/swagger'
import { FacilityType } from '@prisma/client'

export class FacilityResponseDTO {
    @ApiProperty({
        example: '123e4567-e89b-12d3-a456-426614174000',
    })
    id: string

    @ApiProperty({
        enum: FacilityType,
        example: FacilityType.COMPANY,
    })
    type!: FacilityType

    @ApiProperty({ example: 'WiFi' })
    name!: string

    @ApiProperty({ example: 'wifi-icon', required: false })
    icon: string | null
}
