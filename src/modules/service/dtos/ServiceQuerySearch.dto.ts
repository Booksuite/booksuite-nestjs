import { IsDefined, IsString } from 'class-validator'

export class ServiceQuerySearchDTO {
    @IsDefined()
    @IsString()
    name!: string

    @IsDefined()
    price!: string

    @IsDefined()
    adults!: string

    @IsDefined()
    minDaily!: string

    @IsDefined()
    minNotice!: string

    @IsDefined()
    @IsString()
    seasonStart!: Date

    @IsDefined()
    @IsString()
    seasonEnd!: Date

    @IsDefined()
    @IsString()
    page: string

    @IsDefined()
    @IsString()
    itemsPerPage: string
}
