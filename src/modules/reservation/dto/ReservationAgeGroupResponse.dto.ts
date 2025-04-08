import { ApiProperty } from '@nestjs/swagger'

import { AgeGroupDTO } from '@/modules/company/dto/AgeGroup.dto'

export class ReservationAgeGroupResponseDTO {
    @ApiProperty({ example: 2 })
    children!: number

    @ApiProperty({ example: 'f47ac10b-58cc-4372-a567-0e02b2c3d479' })
    ageGroupId!: string

    @ApiProperty({ example: 'f47ac10b-58cc-4372-a567-0e02b2c3d479' })
    reservationId!: string

    @ApiProperty({ type: AgeGroupDTO })
    ageGroup: AgeGroupDTO
}
