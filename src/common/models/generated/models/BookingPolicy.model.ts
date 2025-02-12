import { IsString, IsDefined, IsOptional, IsDate } from "class-validator";
import { Company } from "./";

export class BookingPolicy {
    @IsDefined()
    @IsString()
    id!: string;

    @IsOptional()
    @IsString()
    type?: string;

    @IsDefined()
    @IsString()
    description!: string;

    @IsDefined()
    @IsString()
    companyId!: string;

    @IsDefined()
    company!: Company;

    @IsDefined()
    @IsDate()
    createdAt!: Date;

    @IsDefined()
    @IsDate()
    updatedAt!: Date;
}
