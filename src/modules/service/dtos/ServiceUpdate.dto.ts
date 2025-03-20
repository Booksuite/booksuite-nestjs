import { ApiProperty } from '@nestjs/swagger'
import { Type } from 'class-transformer'
import {
    IsArray,
    IsBoolean,
    IsInt,
    IsISO8601,
    IsOptional,
    IsString,
    ValidateNested,
} from 'class-validator'

import { ServiceHousingUnitTypeDTO } from './ServiceHousingUnitType.dto'
import { ServiceMediaDTO } from './ServiceMedia.dto'

export class ServiceUpdateDTO {
    @ApiProperty({ example: 'massage', required: false })
    @IsOptional()
    @IsString()
    name?: string

    @ApiProperty({ example: true, required: false })
    @IsOptional()
    @IsBoolean()
    published?: boolean

    @ApiProperty({ example: 'PER_PERSON', required: false })
    @IsOptional()
    @IsString()
    billType?: string

    @ApiProperty({ example: 200, required: false })
    @IsOptional()
    price?: number

    @ApiProperty({ example: 3, required: false })
    @IsOptional()
    @IsInt()
    adults?: number

    @ApiProperty({ example: 1, required: false })
    @IsOptional()
    @IsInt()
    minDaily?: number

    @ApiProperty({ example: 1, required: false })
    @IsOptional()
    @IsInt()
    minNotice?: number

    @ApiProperty({ example: true, required: false })
    @IsOptional()
    @IsBoolean()
    onlineSale?: boolean

    @ApiProperty({ example: false, required: false })
    @IsOptional()
    @IsBoolean()
    panelSale?: boolean

    @ApiProperty({ example: true, required: false })
    @IsOptional()
    @IsBoolean()
    seasonalSale?: boolean

    @ApiProperty({ example: '2025-02-21T14:30:00.000Z', required: false })
    @IsOptional()
    @IsISO8601()
    seasonStart?: string

    @ApiProperty({ example: '2025-02-22T14:30:00.000Z', required: false })
    @IsOptional()
    @IsISO8601()
    seasonEnd?: string

    @IsOptional()
    @Type(() => Number)
    @IsArray()
    @ApiProperty({
        type: Number,
        isArray: true,
        required: false,
    })
    @ValidateNested({ each: true })
    availableWeekDays?: PrismaJson.WeekDays

    @ApiProperty({
        example: 'Enjoy a soothing massage during your stay',
        required: false,
    })
    @IsOptional()
    @IsString()
    description?: string

    @ApiProperty({
        example: 'Free Wi-Fi, Breakfast, Swimming Pool Access',
        required: false,
    })
    @IsOptional()
    @IsString()
    included?: string

    @ApiProperty({
        example: 'Seasonal availability, blackout dates apply.',
        required: false,
    })
    @IsOptional()
    @IsString()
    notes?: string

    @ApiProperty({
        example: 'https://www.example.com/video',
        required: false,
        nullable: true,
    })
    @IsOptional()
    @IsString()
    coverMediaId?: string | null

    @ApiProperty({ type: [ServiceMediaDTO], required: false })
    @IsOptional()
    @IsArray()
    @Type(() => ServiceMediaDTO)
    @ValidateNested({ each: true })
    medias?: ServiceMediaDTO[]

    @ApiProperty({ type: [ServiceHousingUnitTypeDTO], required: false })
    @IsOptional()
    @IsArray()
    @ValidateNested()
    @Type(() => ServiceHousingUnitTypeDTO)
    availableHousingUnitTypes?: ServiceHousingUnitTypeDTO[]
}
