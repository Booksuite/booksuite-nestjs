import { Prisma } from '@prisma/client'
import { IsDefined, IsOptional, IsString, IsUUID } from 'class-validator'

export class MediaCreateDTO {
    @IsOptional()
    @IsString()
    id?: string

    @IsDefined()
    @IsString()
    url!: string

    @IsOptional()
    metadata?: Prisma.JsonValue
}
