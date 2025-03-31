import { ApiProperty } from '@nestjs/swagger'
import { IsDefined, IsNumber, IsUUID } from 'class-validator'

export class AgeGroupPriceDTO {
    @ApiProperty({ example: 'e95517fb-b3bb-492f-b605-d289704cde0e' })
    @IsUUID()
    @IsDefined()
    ageGroupId: string

    @ApiProperty({ example: 50 })
    @IsNumber()
    @IsDefined()
    price: number

    @ApiProperty({ example: 0 })
    @IsNumber()
    @IsDefined()
    initialAge: number

    @ApiProperty({ example: 12 })
    @IsNumber()
    @IsDefined()
    finalAge: number
}
