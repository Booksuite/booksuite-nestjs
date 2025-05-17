import { ApiProperty } from '@nestjs/swagger'
import { BillingType } from '@prisma/client'
import { Type } from 'class-transformer'
import {
    IsArray,
    IsBoolean,
    IsEnum,
    IsInt,
    IsISO8601,
    IsOptional,
    IsString,
    ValidateNested,
} from 'class-validator'

import { IsWeekDays } from '@/common/decorators/IsWeekDays.decorator'

import { ServiceHousingUnitTypeDTO } from './ServiceHousingUnitType.dto'
import { ServiceMediaDTO } from './ServiceMedia.dto'

export class ServiceUpdateDTO {
    @ApiProperty({ example: 'massage', required: false, type: String })
    @IsOptional()
    @IsString()
    name?: string

    @ApiProperty({ example: true, required: false, type: Boolean })
    @IsOptional()
    @IsBoolean()
    published?: boolean

    @ApiProperty({
        example: 'PER_PERSON',
        required: false,
        enum: BillingType,
        enumName: 'BillingType',
    })
    @IsOptional()
    @IsEnum(BillingType)
    billingType?: BillingType

    @ApiProperty({ example: 200, required: false, type: Number })
    @IsOptional()
    price?: number

    @ApiProperty({ example: 1, required: false, type: Number })
    @IsOptional()
    @IsInt()
    minDaily?: number

    @ApiProperty({ example: 1, required: false, type: Number })
    @IsOptional()
    @IsInt()
    minNotice?: number

    @ApiProperty({ example: true, required: false, type: Boolean })
    @IsOptional()
    @IsBoolean()
    onlineSale?: boolean

    @ApiProperty({ example: false, required: false, type: Boolean })
    @IsOptional()
    @IsBoolean()
    panelSale?: boolean

    @ApiProperty({ example: true, required: false, type: Boolean })
    @IsOptional()
    @IsBoolean()
    seasonalSale?: boolean

    @ApiProperty({
        example: '2025-02-21T14:30:00.000Z',
        required: false,
        type: String,
    })
    @IsOptional()
    @IsISO8601()
    seasonStart?: string

    @ApiProperty({
        example: '2025-02-22T14:30:00.000Z',
        required: false,
        type: String,
    })
    @IsOptional()
    @IsISO8601()
    seasonEnd?: string

    @ApiProperty({
        example: 'Enjoy a soothing massage during your stay',
        required: false,
        type: String,
    })
    @IsOptional()
    @IsString()
    description?: string

    @ApiProperty({
        example: 'Free Wi-Fi, Breakfast, Swimming Pool Access',
        required: false,
        type: String,
    })
    @IsOptional()
    @IsString()
    included?: string

    @ApiProperty({
        example: 'Seasonal availability, blackout dates apply.',
        required: false,
        type: String,
    })
    @IsOptional()
    @IsString()
    notes?: string

    @ApiProperty({
        example: 'https://www.example.com/video',
        required: false,
        nullable: true,
        type: String,
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

    @ApiProperty({
        type: Number,
        isArray: true,
        required: false,
    })
    @IsOptional()
    @IsWeekDays()
    availableWeekDays?: PrismaJson.WeekDays

    @ApiProperty({ type: [ServiceHousingUnitTypeDTO], required: false })
    @IsOptional()
    @IsArray()
    @Type(() => ServiceHousingUnitTypeDTO)
    availableHousingUnitTypes?: ServiceHousingUnitTypeDTO[]
}
