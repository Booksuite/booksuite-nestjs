import { Type } from 'class-transformer'
import {
    IsArray,
    IsBoolean,
    IsDate,
    IsDefined,
    IsInt,
    IsOptional,
    IsString,
    ValidateIf,
    ValidateNested,
} from 'class-validator'

import { ServiceCategoryCreateDTO } from './ServiceCategoryCreate.dto'
import { ServiceMediaCreateDTO } from './ServiceMediaCreate.dto'

export class ServiceCreateDTO {
    @IsDefined()
    @IsString()
    name!: string

    @IsDefined()
    @IsString()
    billType!: string

    @IsDefined()
    price!: number

    @IsDefined()
    @IsInt()
    adults!: number

    @IsDefined()
    @IsInt()
    minDaily!: number

    @IsDefined()
    @IsInt()
    minNotice!: number

    @IsDefined()
    @IsBoolean()
    onlineSale!: boolean

    @IsDefined()
    @IsBoolean()
    panelSale!: boolean

    @IsDefined()
    @IsBoolean()
    seasonalSale!: boolean

    @IsDefined()
    @IsDate()
    seasonStart!: Date

    @IsDefined()
    @IsDate()
    seasonEnd!: Date

    // @IsOptional()
    // hosting?: Prisma.JsonValue

    // @IsOptional()
    // nights?: Prisma.JsonValue

    @IsDefined()
    @IsString()
    description!: string

    @IsDefined()
    @IsString()
    included!: string

    @IsDefined()
    @IsString()
    notes!: string

    @IsOptional()
    @IsString()
    videoUrl?: string

    @IsDefined()
    @IsArray()
    @Type(() => ServiceMediaCreateDTO)
    @ValidateNested({ each: true })
    medias!: ServiceMediaCreateDTO[]

    @ValidateIf((o) => !o.category)
    @IsDefined()
    @IsString()
    categoryId?: string

    @ValidateIf((o) => !o.categoryId)
    @IsDefined()
    @ValidateNested()
    @Type(() => ServiceCategoryCreateDTO)
    category?: ServiceCategoryCreateDTO
}
