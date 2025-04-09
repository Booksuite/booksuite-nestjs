import { ApiProperty } from '@nestjs/swagger'
import { IsInt, IsOptional, IsUUID } from 'class-validator'

export class SpecialDateMediaDTO {
    @ApiProperty()
    @IsUUID()
    mediaId: string

    @ApiProperty({ required: false })
    @IsOptional()
    @IsInt()
    order?: number
}
