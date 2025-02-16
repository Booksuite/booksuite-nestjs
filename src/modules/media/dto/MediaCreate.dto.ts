import { Prisma } from '@prisma/client'
import { IsDefined, IsOptional, IsString } from 'class-validator'

export class MediaCreateDTO {
    @IsDefined()
    @IsString()
    url!: string

    @IsOptional()
    metadata?: Prisma.JsonValue
}
