import { ApiProperty } from '@nestjs/swagger'
import { IsDefined, IsISO8601, IsString } from 'class-validator'

export class ServiceSearchQueryDTO {
    @IsDefined()
    @IsString()
    name!: string

    @ApiProperty({ example: 350 })
    @IsDefined()
    price!: string

    @ApiProperty({ example: 2 })
    @IsDefined()
    adults!: string

    @ApiProperty({ example: 1 })
    @IsDefined()
    minDaily!: number

    @ApiProperty({ example: 1 })
    @IsDefined()
    minNotice!: number

    @ApiProperty({ example: '03/04/2025' })
    @IsDefined()
    @IsString()
    seasonStart!: Date

    @ApiProperty({ example: '10/07/2025' })
    @IsDefined()
    @IsISO8601()
    seasonEnd!: string

    @ApiProperty({ example: '1' })
    @IsDefined()
    page: string

    @ApiProperty({ example: '5' })
    @IsDefined()
    @IsString()
    itemsPerPage: string
}
