import { ApiProperty } from '@nestjs/swagger'
import { IsDefined, IsInt, IsOptional, IsString, IsUUID } from 'class-validator'

export class HousingUnitDTO {
    @ApiProperty({ example: '6ba7b810-9dad-11d1-80b4-00c04fd430c8' })
    @IsOptional()
    @IsUUID()
    id?: string

    @ApiProperty({ example: 1, required: false })
    @IsOptional()
    @IsInt()
    order?: number

    @ApiProperty({ example: '204' })
    @IsDefined()
    @IsString()
    name!: string
}
