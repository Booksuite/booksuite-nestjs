import {
    IsBoolean,
    IsDefined,
    IsInt,
    IsOptional,
    IsString,
} from 'class-validator'

export class Experience {
    @IsDefined()
    @IsString()
    name!: string

    @IsOptional()
    @IsString()
    status?: string

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
    @IsString()
    seasonStart!: Date

    @IsDefined()
    @IsString()
    seasonEnd!: Date

    @IsDefined()
    @IsString()
    description!: string

    @IsDefined()
    @IsString()
    notes!: string

    @IsOptional()
    @IsString()
    videoUrl?: string

    @IsDefined()
    price!: number

    @IsOptional()
    @IsString()
    priceAdjustment?: string

    @IsDefined()
    discount!: number

    @IsDefined()
    @IsString()
    billType!: string
}
