import { ApiProperty } from '@nestjs/swagger'
import { IsDefined, IsOptional, IsString } from 'class-validator'

export class ReservationPolicyDTO {
    @IsOptional()
    @IsString()
    type?: string

    @ApiProperty({ example: 'age policy for children' })
    @IsDefined()
    @IsString()
    description!: string
}
