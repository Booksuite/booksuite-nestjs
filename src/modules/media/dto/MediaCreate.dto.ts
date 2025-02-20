import { ApiProperty } from '@nestjs/swagger'
import { Prisma } from '@prisma/client'
import { IsDefined, IsOptional, IsString } from 'class-validator'

export class MediaCreateDTO {
    @ApiProperty({ example: '6ba7b810-9dad-11d1-80b4-00c04fd430c8' })
    @IsOptional()
    @IsString()
    id?: string

    @ApiProperty({ example: 'https://via.placeholder.com/image.png' })
    @IsDefined()
    @IsString()
    url!: string

    @ApiProperty({ example: '{imageSize: 1020}' })
    @IsOptional()
    metadata?: Prisma.InputJsonValue
}
