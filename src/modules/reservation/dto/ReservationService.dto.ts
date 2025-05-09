import { ApiProperty } from '@nestjs/swagger'
import { IsDefined, IsInt, IsString } from 'class-validator'

export class ReservationServiceDTO {
    @ApiProperty({ example: 2, type: Number })
    @IsDefined()
    @IsInt()
    quantity!: number

    @ApiProperty({ example: 150 })
    @IsDefined()
    totalPrice!: number

    @ApiProperty({ example: 'f47ac10b-58cc-4372-a567-0e02b2c3d479' })
    @IsDefined()
    @IsString()
    serviceId!: string
}
