import { ApiProperty } from '@nestjs/swagger'

export class ServiceCategoryResponseDTO {
    @ApiProperty({ example: 'd68ffa59-0c42-49a6-b6d8-312569e33505' })
    id!: string

    @ApiProperty({ example: 'relaxing' })
    name!: string
}
