import { Prisma } from '@prisma/client'
import { IsNumberString, IsOptional, IsString } from 'class-validator'

import { PropertySavePayload } from './property.interface'

export class PropertyDTO implements PropertySavePayload {
    @IsNumberString()
    id?: boolean

    @IsOptional()
    @IsString()
    name?: boolean

    @IsString()
    slug?: boolean
}
