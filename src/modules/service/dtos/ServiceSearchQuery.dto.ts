import { ApiProperty } from '@nestjs/swagger'
import { IsDefined, IsString } from 'class-validator'

export class ServiceSearchQueryDTO {
    @IsDefined()
    @IsString()
    name!: string

    @ApiProperty({ example: '350' })
    @IsDefined()
    price!: string

    @ApiProperty({ example: '2' })
    @IsDefined()
    adults!: string

    @ApiProperty({ example: '1' })
    @IsDefined()
    minDaily!: string

    @ApiProperty({ example: '1' })
    @IsDefined()
    minNotice!: string

    @ApiProperty({ example: '03/04/2025' })
    @IsDefined()
    @IsString()
    seasonStart!: Date

    @ApiProperty({ example: '10/07/2025' })
    @IsDefined()
    @IsString()
    seasonEnd!: Date

    @ApiProperty({ example: '1' })
    @IsDefined()
    @IsString()
    page: string

    @ApiProperty({ example: '5' })
    @IsDefined()
    @IsString()
    itemsPerPage: string
}
