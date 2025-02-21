import { ApiProperty } from '@nestjs/swagger'
import { IsDefined, IsISO8601, IsString } from 'class-validator'

export class ServiceSearchQueryDTO {
    @IsDefined()
    @IsString()
    name!: string

    @ApiProperty({ example: 350 })
    @IsDefined()
    price!: number

    @ApiProperty({ example: 2 })
    @IsDefined()
    adults!: number

    @ApiProperty({ example: 1 })
    @IsDefined()
    minDaily!: number

    @ApiProperty({ example: 1 })
    @IsDefined()
    minNotice!: number

    @ApiProperty({ example: '2025-02-22T14:30:00.000Z' })
    @IsDefined()
    @IsISO8601()
    seasonStart!: string

    @ApiProperty({ example: '2025-02-23T14:30:00.000Z' })
    @IsDefined()
    @IsISO8601()
    seasonEnd!: string

    @ApiProperty({ example: 1 })
    @IsDefined()
    page: number

    @ApiProperty({ example: 5 })
    @IsDefined()
    @IsString()
    itemsPerPage: number
}
