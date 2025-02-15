import { IsBoolean, IsDefined, IsOptional, IsString } from 'class-validator'

export class HouseUnitTypeFacilityCreateDTO {
    @IsOptional()
    @IsBoolean()
    isFeatured?: boolean

    @IsDefined()
    @IsString()
    housingUnitTypeId!: string

    @IsDefined()
    @IsString()
    facilityId!: string
}
