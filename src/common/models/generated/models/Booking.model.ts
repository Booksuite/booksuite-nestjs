import { IsString, IsDefined, IsDate, IsInt, IsOptional } from "class-validator";
import { HousingUnit, BookingService } from "./";

export class Booking {
    @IsDefined()
    @IsString()
    id!: string;

    @IsDefined()
    @IsString()
    status!: string;

    @IsDefined()
    @IsDate()
    startDate!: Date;

    @IsDefined()
    @IsDate()
    endDate!: Date;

    @IsOptional()
    @IsInt()
    totalDays?: number;

    @IsDefined()
    @IsInt()
    adults!: number;

    @IsDefined()
    @IsInt()
    children!: number;

    @IsDefined()
    @IsString()
    saleChannel!: string;

    @IsDefined()
    @IsString()
    notes!: string;

    @IsDefined()
    @IsString()
    housingUnitId!: string;

    @IsDefined()
    HousingUnit!: HousingUnit;

    @IsDefined()
    services!: BookingService[];

    @IsDefined()
    @IsDate()
    createdAt!: Date;

    @IsDefined()
    @IsDate()
    updatedAt!: Date;

    @IsOptional()
    @IsDate()
    deletedAt?: Date;
}
