import {
    IsBoolean,
    IsDate,
    IsDefined,
    IsOptional,
    IsString,
} from 'class-validator'

import { Facility, HousingUnitType } from './'

export class HouseUnitTypeFacility {
    @IsDefined()
    @IsString()
    id!: string

    @IsOptional()
    @IsBoolean()
    isFeatured?: boolean

    @IsDefined()
    @IsString()
    housingUnitTypeId!: string

    @IsDefined()
    housingUnitType!: HousingUnitType

    @IsDefined()
    @IsString()
    facilityId!: string

    @IsDefined()
    facility!: Facility

    @IsDefined()
    @IsDate()
    createdAt!: Date

    @IsDefined()
    @IsDate()
    updatedAt!: Date
}
