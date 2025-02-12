import { IsString, IsDefined, IsDate } from "class-validator";
import { HouseUnitTypeFacility } from "./";

export class Facility {
    @IsDefined()
    @IsString()
    id!: string;

    @IsDefined()
    @IsString()
    name!: string;

    @IsDefined()
    houseUnitTypeFacility!: HouseUnitTypeFacility[];

    @IsDefined()
    @IsDate()
    createdAt!: Date;

    @IsDefined()
    @IsDate()
    updatedAt!: Date;
}
