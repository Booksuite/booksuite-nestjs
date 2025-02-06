import './'

import { IsDate, IsDefined, IsInt, IsOptional, IsString } from 'class-validator'

export class Policy {
    @IsDefined()
    @IsInt()
    id!: number

    @IsOptional()
    @IsString()
    type?: string

    @IsDefined()
    @IsString()
    description!: string

    @IsDefined()
    @IsDate()
    createdAt!: Date

    @IsDefined()
    @IsDate()
    updatedAt!: Date
}
