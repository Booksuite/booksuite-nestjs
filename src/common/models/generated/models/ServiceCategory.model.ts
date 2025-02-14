import { IsDefined, IsString } from 'class-validator'

import { Service } from './'

export class ServiceCategory {
    @IsDefined()
    @IsString()
    id!: string

    @IsDefined()
    @IsString()
    name!: string

    @IsDefined()
    services!: Service[]
}
