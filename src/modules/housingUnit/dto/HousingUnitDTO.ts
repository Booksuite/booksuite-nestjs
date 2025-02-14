import { IsDefined, IsString } from 'class-validator'

export class HousingUnitDTO {
    @IsDefined()
    @IsString()
    name!: string

    @IsDefined()
    @IsString()
    housingUnitTypeId!: string
}
