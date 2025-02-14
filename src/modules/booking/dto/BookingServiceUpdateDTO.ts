import { IsDefined, IsInt, IsString } from 'class-validator'

export class BookingServiceUpdateDTO {
    @IsDefined()
    @IsString()
    id!: string

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
