import { ApiProperty } from '@nestjs/swagger'
import { IsDefined, IsInt, IsOptional, IsString } from 'class-validator'

import { MediaResponseDTO } from '@/modules/media/dto/MediaResponse.dto'

export class ServiceMediaResponseDTO {
    @ApiProperty({ example: '8c8ab0cb-7689-4357-b446-1348cfe3842d' })
    @IsOptional()
    @IsInt()
    id!: string

    @ApiProperty({ example: 1, nullable: true, type: Number })
    @IsOptional()
    @IsInt()
    order: number | null

    @ApiProperty({ type: [MediaResponseDTO] })
    @IsDefined()
    @IsString()
    media!: MediaResponseDTO
}
