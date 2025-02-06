import { IsDate, IsDefined, IsInt, IsString } from 'class-validator'

import { User } from './'

export class Role {
    @IsDefined()
    @IsInt()
    id!: number

    @IsDefined()
    @IsString()
    name!: string

    @IsDefined()
    @IsString()
    slug!: string

    @IsDefined()
    users!: User[]

    @IsDefined()
    @IsDate()
    createdAt!: Date
}
