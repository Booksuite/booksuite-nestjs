import { IsDefined, IsInt, IsString } from 'class-validator'

export class BookingServiceCreateDTO {
    @IsDefined()
    @IsInt()
    qtd!: number

    @IsDefined()
    totalPrice!: number

    @IsDefined()
    @IsString()
    serviceId!: string

    @IsDefined()
    @IsString()
    bookId!: string
}
