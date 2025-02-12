import { IsString, IsDefined, IsOptional, IsIn, IsDate } from "class-validator";
import { Company } from "./";
import { getEnumValues } from "../helpers";
import { ReservationDepositType } from "../enums";

export class ReservationConfig {
    @IsDefined()
    @IsString()
    id!: string;

    @IsOptional()
    tax?: number;

    @IsDefined()
    @IsIn(getEnumValues(ReservationDepositType))
    reservationDepositType!: ReservationDepositType;

    @IsOptional()
    reservationDepositTypeValue?: number;

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
