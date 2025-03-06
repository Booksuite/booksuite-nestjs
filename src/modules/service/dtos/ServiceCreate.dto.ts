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
    ValidateNested,
} from 'class-validator'

import { ServiceCategoryDTO } from './ServiceCategoryCreate.dto'
import { ServiceMediaCreateDTO } from './ServiceMediaCreate.dto'

export class ServiceCreateDTO {
    @ApiProperty({ example: 'massage' })
    @IsDefined()
    @IsString()
    name!: string

    @ApiProperty({ example: true })
    @IsDefined()
    @IsBoolean()
    published: boolean

    @ApiProperty({ example: 'PER_PERSON' })
    @IsDefined()
    @IsString()
    billType!: string

    @ApiProperty({ example: 200 })
    @IsDefined()
    price!: number

    @ApiProperty({ example: 3 })
    @IsDefined()
    @IsInt()
    adults!: number

    @ApiProperty({ example: 1 })
    @IsDefined()
    @IsInt()
    minDaily!: number

    @ApiProperty({ example: 1 })
    @IsDefined()
    @IsInt()
    minNotice!: number

    @ApiProperty({ example: true })
    @IsDefined()
    @IsBoolean()
    onlineSale!: boolean

    @ApiProperty({ example: false })
    @IsDefined()
    @IsBoolean()
    panelSale!: boolean

    @ApiProperty({ example: true })
    @IsDefined()
    @IsBoolean()
    seasonalSale!: boolean

    @ApiProperty({ example: '2025-02-21T14:30:00.000Z' })
    @IsDefined()
    @IsISO8601()
    seasonStart!: string

    @ApiProperty({ example: '2025-02-22T14:30:00.000Z' })
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

    @ApiProperty({ example: 'https://www.example.com/video', required: false })
    @IsOptional()
    @IsString()
    videoUrl?: string

    @ApiProperty({ type: [ServiceMediaCreateDTO] })
    @IsDefined()
    @IsArray()
    @Type(() => ServiceMediaCreateDTO)
    @ValidateNested({ each: true })
    medias!: ServiceMediaCreateDTO[]

    @ApiProperty({ type: [ServiceCategoryDTO] })
    @IsDefined()
    @ValidateNested()
    @Type(() => ServiceCategoryDTO)
    category: ServiceCategoryDTO
}
