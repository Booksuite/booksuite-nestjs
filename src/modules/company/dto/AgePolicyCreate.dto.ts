import { Type } from 'class-transformer'
import {
    IsArray,
    IsBoolean,
    IsDefined,
    IsInt,
    ValidateNested,
} from 'class-validator'

import { AgeGroupCreateDTO } from './AgeGroupCreate.dto'

export class AgePolicyCreateDTO {
    @IsDefined()
    @IsBoolean()
    acceptChildren!: boolean

    @IsDefined()
    @IsInt()
    adultMinAge!: number

    @IsDefined()
    @IsArray()
    @Type(() => AgeGroupCreateDTO)
    @ValidateNested({ each: true })
    ageGroups!: AgeGroupCreateDTO[]
}
