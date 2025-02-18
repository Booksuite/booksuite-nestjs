import { IsDefined, IsObject, IsString } from 'class-validator'

import { PaginationQueryDTO } from '@/common/dto/PaginationRequest.dto'

export class serviceQuerySearchDTO {
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
