import { ApiProperty } from '@nestjs/swagger'
import { BillingType } from '@prisma/client'
import { Type } from 'class-transformer'
import {
    IsArray,
    IsBoolean,
    IsDefined,
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

export class ServiceCreateDTO {
    @ApiProperty({ example: 'massage' })
    @IsDefined()
    @IsString()
    name!: string

    @ApiProperty({ example: true })
    @IsDefined()
    @IsBoolean()
    published: boolean

    @ApiProperty({
        enum: BillingType,
        enumName: 'BillingType',
        example: 'PER_GUEST_DAILY',
    })
    @IsDefined()
    @IsEnum(BillingType)
    billingType!: BillingType

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
    minStay!: number

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
    coverMediaId?: string

    @ApiProperty({ type: [ServiceMediaDTO] })
    @IsDefined()
    @IsArray()
    @Type(() => ServiceMediaDTO)
    @ValidateNested({ each: true })
    medias!: ServiceMediaDTO[]

    @ApiProperty({ type: Number, isArray: true })
    @IsDefined()
    @IsWeekDays()
    availableWeekDays: PrismaJson.WeekDays

    @ApiProperty({ type: [ServiceHousingUnitTypeDTO] })
    @IsDefined()
    @IsArray()
    @ValidateNested()
    @Type(() => ServiceHousingUnitTypeDTO)
    availableHousingUnitTypes: ServiceHousingUnitTypeDTO[]
}
