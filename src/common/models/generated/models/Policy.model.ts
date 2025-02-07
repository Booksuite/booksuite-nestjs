import './'

import { IsDefined, IsOptional, IsString } from 'class-validator'

export class Policy {
    @IsOptional()
    @IsString()
    type?: string

    @IsDefined()
    @IsString()
    description!: string
}
