import { ApiProperty } from '@nestjs/swagger'
import { FacilityCategory, FacilityType } from '@prisma/client'

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

    @ApiProperty({
        enum: FacilityCategory,
        example: FacilityCategory.GENERAL,
    })
    category!: FacilityCategory

    @ApiProperty({ example: 'WiFi' })
    name!: string

    @ApiProperty({ example: 'wifi-icon', nullable: true, type: String })
    icon: string | null
}
