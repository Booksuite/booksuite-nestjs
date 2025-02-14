import { IsDate, IsDefined, IsString } from 'class-validator'

import { Booking, HousingUnitType } from './'

export class HousingUnit {
    @IsDefined()
    @IsString()
    id!: string

    @IsDefined()
    @IsString()
    name!: string

    @IsDefined()
    booking!: Booking[]

    @IsDefined()
    @IsString()
    housingUnitTypeId!: string

    @IsDefined()
    housingUnitType!: HousingUnitType

    @IsDefined()
    @IsDate()
    createdAt!: Date

    @IsDefined()
    @IsDate()
    updatedAt!: Date
}
