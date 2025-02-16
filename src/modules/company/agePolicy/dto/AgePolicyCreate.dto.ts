import { Type } from 'class-transformer'
import {
    IsArray,
    IsBoolean,
    IsDefined,
    IsInt,
    IsString,
    ValidateNested,
} from 'class-validator'

import { AgeGroupCreateDTO } from './AgeGrouCreate.dto'

export class AgePolicyCreateDTO {
    @IsDefined()
    @IsBoolean()
    acceptChildren!: boolean

    @IsDefined()
    @IsInt()
    adultMinAge!: number

    @IsDefined()
    @IsString()
    companyId!: string

    @IsDefined()
    @IsArray()
    @Type(() => AgeGroupCreateDTO)
    @ValidateNested({ each: true })
    ageGroups!: AgeGroupCreateDTO[]
}
