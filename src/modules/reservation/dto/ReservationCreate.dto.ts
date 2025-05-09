import { ApiProperty } from '@nestjs/swagger'
import { ReservationSaleChannel, ReservationStatus } from '@prisma/client'
import { Type } from 'class-transformer'
import {
    IsArray,
    IsDateString,
    IsDefined,
    IsEnum,
    IsInt,
    IsNumber,
    IsOptional,
    IsString,
    IsUUID,
} from 'class-validator'

import { UserCreateDTO } from '@/modules/user/dto/UserCreate.dto'

import { ReservationAgeGroupDTO } from './ReservationAgeGroup.dto'
import { ReservationServiceDTO } from './ReservationService.dto'

export class ReservationCreateDTO {
    @ApiProperty({
        enum: ReservationStatus,
        example: ReservationStatus.CONFIRMED,
    })
    @IsDefined()
    @IsEnum(ReservationStatus)
    status!: ReservationStatus

    @ApiProperty({
        type: UserCreateDTO,
    })
    @IsDefined()
    @Type(() => UserCreateDTO)
    guestUser: UserCreateDTO

    @ApiProperty({ example: 'f47ac10b-58cc-4372-a567-0e02b2c3d479' })
    @IsOptional()
    @IsUUID()
    sellerUserId?: string

    @ApiProperty({
        enum: ReservationSaleChannel,
        example: ReservationSaleChannel.BOOKSUITE,
        required: false,
    })
    @IsOptional()
    @IsEnum(ReservationSaleChannel)
    saleChannel?: ReservationSaleChannel

    @ApiProperty({ example: '2025-01-14' })
    @IsDefined()
    @IsDateString()
    startDate!: string

    @ApiProperty({ example: '2024-10-10' })
    @IsDefined()
    @IsDateString()
    endDate!: string

    @ApiProperty({ example: '7' })
    @IsOptional()
    @IsInt()
    totalDays?: number

    @ApiProperty({ example: 7, type: Number })
    @IsDefined()
    @IsNumber()
    finalPrice: number

    @ApiProperty({ example: '2' })
    @IsDefined()
    @IsInt()
    adults!: number

    @ApiProperty({ type: [ReservationAgeGroupDTO] })
    @IsDefined()
    @IsArray()
    ageGroups!: ReservationAgeGroupDTO[]

    @ApiProperty({ example: 'Featured booking' })
    @IsDefined()
    @IsString()
    notes!: string

    @ApiProperty({ example: 'f47ac10b-58cc-4372-a567-0e02b2c3d479' })
    @IsDefined()
    @IsUUID()
    housingUnitId: string

    @ApiProperty({ type: [ReservationServiceDTO] })
    @IsDefined()
    @IsArray()
    @Type(() => ReservationServiceDTO)
    services!: ReservationServiceDTO[]

    @ApiProperty({ type: String, required: false })
    @IsOptional()
    @IsUUID()
    rateOptionId?: string
}
