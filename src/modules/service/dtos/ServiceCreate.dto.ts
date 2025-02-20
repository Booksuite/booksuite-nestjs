import { ApiProperty } from '@nestjs/swagger'
import { Type } from 'class-transformer'
import {
    IsArray,
    IsBoolean,
    IsDefined,
    IsInt,
    IsISO8601,
    IsOptional,
    IsString,
    ValidateIf,
    ValidateNested,
} from 'class-validator'

import { ServiceCategoryCreateDTO } from './ServiceCategoryCreate.dto'
import { ServiceMediaCreateDTO } from './ServiceMediaCreate.dto'

export class ServiceCreateDTO {
    @ApiProperty({ example: 'massage' })
    @IsDefined()
    @IsString()
    name!: string

    @ApiProperty({ example: 'PER_PERSON' })
    @IsDefined()
    @IsString()
    billType!: string

    @ApiProperty({ example: '200' })
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
    @IsISO8601()
    seasonStart!: string

    @IsDefined()
    @IsISO8601()
    seasonEnd!: string

    // @IsOptional()
    // hosting?: Prisma.JsonValue

    // @IsOptional()
    // nights?: Prisma.JsonValue

    @ApiProperty({
        example: 'Enjoy a soothing massage during your stay',
    })
    @IsDefined()
    @IsString()
    description!: string

    @ApiProperty({ example: 'Free Wi-Fi, Breakfast, Swimming Pool Access' })
    @IsDefined()
    @IsString()
    included!: string

    @ApiProperty({ example: 'Seasonal availability, blackout dates apply.' })
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

    @ApiProperty({ example: '3c39db8f-ec01-4bf1-89e3-a4b458903b2c' })
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
