import { ApiProperty } from '@nestjs/swagger'
import { Type } from 'class-transformer'
import {
    IsArray,
    IsBoolean,
    IsDefined,
    IsInt,
    ValidateNested,
} from 'class-validator'

import { AgeGroupDTO } from './AgeGroup.dto'

export class AgePolicyDTO {
    @ApiProperty({ example: true })
    @IsDefined()
    @IsBoolean()
    acceptChildren!: boolean

    @ApiProperty({ example: 12 })
    @IsDefined()
    @IsInt()
    adultMinAge!: number

    @ApiProperty({ type: [AgeGroupDTO] })
    @IsDefined()
    @IsArray()
    @Type(() => AgeGroupDTO)
    @ValidateNested({ each: true })
    ageGroups!: AgeGroupDTO[]
}
