import { IsString, IsDefined, IsBoolean, IsOptional, IsDate } from "class-validator";
import { HousingUnitType, Facility } from "./";

export class HouseUnitTypeFacility {
    @IsDefined()
    @IsString()
    id!: string;

    @IsOptional()
    @IsBoolean()
    isFeatured?: boolean;

    @IsDefined()
    @IsString()
    housingUnitTypeId!: string;

    @IsDefined()
    housingUnitType!: HousingUnitType;

    @IsDefined()
    @IsString()
    facilityId!: string;

    @IsDefined()
    facility!: Facility;

    @IsDefined()
    @IsDate()
    createdAt!: Date;

    @IsDefined()
    @IsDate()
    updatedAt!: Date;
}
