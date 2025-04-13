import { ApiProperty } from '@nestjs/swagger'
import { IsDefined, IsInt, IsString } from 'class-validator'

export class ReservationAgeGroupDTO {
    @ApiProperty({ example: 2 })
    @IsDefined()
    @IsInt()
    quantity!: number

    @ApiProperty({ example: 'f47ac10b-58cc-4372-a567-0e02b2c3d479' })
    @IsDefined()
    @IsString()
    ageGroupId!: string
}
