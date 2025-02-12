import { IsString, IsDefined, IsInt, IsOptional, IsDate } from "class-validator";
import { Service, Media } from "./";

export class ServiceMedia {
    @IsDefined()
    @IsString()
    id!: string;

    @IsOptional()
    @IsInt()
    order?: number;

    @IsDefined()
    @IsString()
    serviceId!: string;

    @IsDefined()
    sevice!: Service;

    @IsDefined()
    @IsString()
    mediaId!: string;

    @IsDefined()
    media!: Media;

    @IsDefined()
    @IsDate()
    createdAt!: Date;

    @IsDefined()
    @IsDate()
    updatedAt!: Date;
}
