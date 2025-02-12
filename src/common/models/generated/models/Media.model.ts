import { Prisma } from "@prisma/client";
import { IsString, IsDefined, IsOptional, IsDate } from "class-validator";
import { HousingUnitTypeMedia, ServiceMedia, BannerMedia } from "./";

export class Media {
    @IsDefined()
    @IsString()
    id!: string;

    @IsDefined()
    @IsString()
    url!: string;

    @IsOptional()
    metadata?: Prisma.JsonValue;

    @IsDefined()
    @IsDate()
    createdAt!: Date;

    @IsDefined()
    @IsDate()
    updatedAt!: Date;

    @IsDefined()
    housingUnitTypeMedias!: HousingUnitTypeMedia[];

    @IsDefined()
    serviceMedias!: ServiceMedia[];

    @IsDefined()
    bannerMedias!: BannerMedia[];
}
