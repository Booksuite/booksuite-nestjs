import { IsDate, IsDefined, IsInt, IsString } from 'class-validator'

import { PropertyConvenience } from './'

export class Convenience {
    @IsDefined()
    @IsInt()
    id!: number

    @IsDefined()
    @IsString()
    name!: string

    @IsDefined()
    property!: PropertyConvenience[]

    @IsDefined()
    @IsDate()
    createdAt!: Date

    @IsDefined()
    @IsDate()
    updatedAt!: Date
}
