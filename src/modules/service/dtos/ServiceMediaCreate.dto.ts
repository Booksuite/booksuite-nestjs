import { ApiProperty } from '@nestjs/swagger'
import { IsDefined, IsInt, IsOptional, IsString } from 'class-validator'

export class ServiceMediaCreateDTO {
    @ApiProperty({ example: 1 })
    @IsOptional()
    @IsInt()
    order?: number | null

    @ApiProperty({ example: '8c8ab0cb-7689-4357-b446-1348cfe3842d' })
    @IsDefined()
    @IsString()
    mediaId!: string
}
