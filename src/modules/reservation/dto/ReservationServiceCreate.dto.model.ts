import { ApiProperty } from '@nestjs/swagger'
import { IsDefined, IsInt, IsString } from 'class-validator'

export class ReservationServiceCreateDTO {
    @IsDefined()
    @IsInt()
    qtd!: number

    @ApiProperty({ example: '150' })
    @IsDefined()
    totalPrice!: number

    @ApiProperty({ example: 'f47ac10b-58cc-4372-a567-0e02b2c3d479' })
    @IsDefined()
    @IsString()
    serviceId!: string

    @ApiProperty({ example: '6ba7b810-9dad-11d1-80b4-00c04fd430c8' })
    @IsDefined()
    @IsString()
    bookId!: string
}
