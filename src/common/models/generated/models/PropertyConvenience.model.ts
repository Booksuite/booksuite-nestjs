import { IsBoolean, IsDefined, IsInt, IsOptional } from 'class-validator'

import { Convenience, Property } from './'

export class PropertyConvenience {
    @IsDefined()
    @IsInt()
    id!: number

    @IsOptional()
    @IsBoolean()
    isFeatured?: boolean

    @IsOptional()
    @IsBoolean()
    isBed?: boolean

    @IsOptional()
    @IsInt()
    bedQuantity?: number

    @IsDefined()
    @IsInt()
    propertyId!: number

    @IsDefined()
    property!: Property

    @IsDefined()
    @IsInt()
    convenienceId!: number

    @IsDefined()
    convenience!: Convenience
}
