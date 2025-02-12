import { IsString, IsDefined, IsInt, IsIn, IsDate } from "class-validator";
import { CancellationPolicy } from "./";
import { getEnumValues } from "../helpers";
import { CancellationPolicyPenalty } from "../enums";

export class PenaltyRange {
    @IsDefined()
    @IsString()
    id!: string;

    @IsDefined()
    @IsInt()
    daysBeforeCheckIn!: number;

    @IsDefined()
    @IsIn(getEnumValues(CancellationPolicyPenalty))
    penaltyBy!: CancellationPolicyPenalty;

    @IsDefined()
    @IsInt()
    value!: number;

    @IsDefined()
    @IsString()
    cancellationPolicyId!: string;

    @IsDefined()
    cancellationPolicy!: CancellationPolicy;

    @IsDefined()
    @IsDate()
    createdAt!: Date;

    @IsDefined()
    @IsDate()
    updatedAt!: Date;
}
