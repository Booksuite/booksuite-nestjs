import { IsString, IsDefined, IsBoolean, IsInt, IsDate } from "class-validator";
import { Company, AgeGroup } from "./";

export class AgePolicy {
    @IsDefined()
    @IsString()
    id!: string;

    @IsDefined()
    @IsBoolean()
    acceptChildren!: boolean;

    @IsDefined()
    @IsInt()
    adultMinAge!: number;

    @IsDefined()
    @IsString()
    companyId!: string;

    @IsDefined()
    company!: Company;

    @IsDefined()
    ageGroups!: AgeGroup[];

    @IsDefined()
    @IsDate()
    createdAt!: Date;

    @IsDefined()
    @IsDate()
    updatedAt!: Date;
}
