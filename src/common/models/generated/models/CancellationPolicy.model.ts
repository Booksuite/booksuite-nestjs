import { IsString, IsDefined, IsIn, IsInt, IsDate } from "class-validator";
import { Company, PenaltyRange } from "./";
import { getEnumValues } from "../helpers";
import { CancellationPolicyPenalty } from "../enums";

export class CancellationPolicy {
    @IsDefined()
    @IsString()
    id!: string;

    @IsDefined()
    @IsString()
    text!: string;

    @IsDefined()
    @IsIn(getEnumValues(CancellationPolicyPenalty))
    defaultPenaltyBy!: CancellationPolicyPenalty;

    @IsDefined()
    @IsInt()
    defaultValue!: number;

    @IsDefined()
    @IsString()
    companyId!: string;

    @IsDefined()
    company!: Company;

    @IsDefined()
    penaltyRanges!: PenaltyRange[];

    @IsDefined()
    @IsDate()
    createdAt!: Date;

    @IsDefined()
    @IsDate()
    updatedAt!: Date;
}
