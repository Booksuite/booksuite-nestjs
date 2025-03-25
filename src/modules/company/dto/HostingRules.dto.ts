import { ApiProperty } from '@nestjs/swagger'
import {
    IsArray,
    IsDefined,
    IsInt,
    IsNumber,
    IsOptional,
    IsString,
} from 'class-validator'

export class HostingRulesDTO {
    @ApiProperty({ example: 14 })
    @IsInt()
    checkIn: number

    @ApiProperty({ example: 12 })
    @IsInt()
    checkOut: number

    @ApiProperty({ example: 2 })
    @IsInt()
    minDaily: number

    @ApiProperty({ type: Number, isArray: true })
    @IsDefined()
    @IsNumber({}, { each: true })
    @IsArray()
    availableWeekend: PrismaJson.WeekDays

    @ApiProperty({ example: '2025-12-01' })
    @IsString()
    seasonStart: Date

    @ApiProperty({ example: '2025-12-31' })
    @IsString()
    seasonEnd: Date

    @ApiProperty({ example: true })
    @IsOptional()
    hostingOnSpecificDays: boolean

    @ApiProperty({ type: Number, isArray: true })
    @IsDefined()
    @IsNumber({}, { each: true })
    @IsArray()
    availableWeekDays: PrismaJson.WeekDays
}
