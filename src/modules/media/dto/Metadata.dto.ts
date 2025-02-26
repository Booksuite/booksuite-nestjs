import { ApiProperty } from '@nestjs/swagger'
import { Prisma } from '@prisma/client'
import { IsDefined, IsString } from 'class-validator'

export class MetadataDto implements Prisma.InputJsonObject {
    readonly [x: string]: Prisma.InputJsonValue | null | undefined

    @ApiProperty({
        example: 'image/png',
    })
    @IsString()
    @IsDefined()
    mimetype: string
}
