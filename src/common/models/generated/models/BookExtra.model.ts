import { IsDefined, IsInt } from 'class-validator'

import { Book, Extra } from './'

export class BookExtra {
    @IsDefined()
    @IsInt()
    id!: number

    @IsDefined()
    @IsInt()
    qtd!: number

    @IsDefined()
    totalPrice!: number

    @IsDefined()
    @IsInt()
    extraId!: number

    @IsDefined()
    extra!: Extra

    @IsDefined()
    @IsInt()
    bookId!: number

    @IsDefined()
    book!: Book
}
