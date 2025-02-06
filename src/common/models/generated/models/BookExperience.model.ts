import { IsDefined, IsInt } from 'class-validator'

import { Book, Experience } from './'

export class BookExperience {
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
    experienceId!: number

    @IsDefined()
    experience!: Experience

    @IsDefined()
    @IsInt()
    bookId!: number

    @IsDefined()
    book!: Book
}
