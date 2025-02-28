import { ApiProperty } from '@nestjs/swagger'

export class AgePolicyResponseDTO {
    @ApiProperty({ example: 'bcd82497-2cc3-4998-b3d9-99db2f56b159' })
    id: string

    @ApiProperty({ example: true })
    acceptChildren!: boolean

    @ApiProperty({ example: 12 })
    adultMinAge!: number
}
