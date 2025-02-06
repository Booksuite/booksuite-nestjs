import { Prisma } from '@prisma/client'
import { IsDate, IsDefined, IsInt, IsString } from 'class-validator'

import { TaxCategory } from './'

export class Tax {
    @IsDefined()
    @IsInt()
    id!: number

    @IsDefined()
    @IsString()
    name!: string

    @IsDefined()
    @IsString()
    billType!: string

    @IsDefined()
    price!: number

    @IsDefined()
    includedItems!: Prisma.JsonValue

    @IsDefined()
    nights!: Prisma.JsonValue

    @IsDefined()
    categories!: TaxCategory[]

    @IsDefined()
    @IsDate()
    createdAt!: Date

    @IsDefined()
    @IsDate()
    updatedAt!: Date
}
