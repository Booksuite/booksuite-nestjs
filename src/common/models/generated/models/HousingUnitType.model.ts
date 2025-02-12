import { IsString, IsDefined, IsOptional, IsInt, IsDate } from "class-validator";
import { Company, HousingUnitTypeMedia, HousingUnit, HouseUnitTypeFacility } from "./";

export class HousingUnitType {
    @IsDefined()
    @IsString()
    id!: string;

    @IsDefined()
    @IsString()
    name!: string;

    @IsDefined()
    @IsString()
    slug!: string;

    @IsOptional()
    @IsString()
    shortDescription?: string;

    @IsOptional()
    @IsString()
    description?: string;

    @IsDefined()
    @IsInt()
    order!: number;

    @IsOptional()
    @IsInt()
    minGuests?: number;

    @IsOptional()
    @IsInt()
    maxGuests?: number;

    @IsOptional()
    @IsInt()
    maxAdults?: number;

    @IsOptional()
    @IsInt()
    maxChildren?: number;

    @IsDefined()
    weekdaysPrice!: number;

    @IsDefined()
    weekendPrice!: number;

    @IsDefined()
    extraAdultPrice!: number;

    @IsDefined()
    @IsInt()
    chargeExtraAdultHigherThan!: number;

    @IsDefined()
    @IsString()
    companyId!: string;

    @IsOptional()
    company?: Company;

    @IsDefined()
    medias!: HousingUnitTypeMedia[];

    @IsDefined()
    housingUnit!: HousingUnit[];

    @IsDefined()
    @IsDate()
    createdAt!: Date;

    @IsDefined()
    @IsDate()
    updatedAt!: Date;

    @IsOptional()
    @IsDate()
    deletedAt?: Date;

    @IsDefined()
    PropertyConvenience!: HouseUnitTypeFacility[];
}
