import { IsDefined, IsString } from 'class-validator'

export class Category {
    @IsDefined()
    @IsString()
    name!: string
}
