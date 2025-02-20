import { ApiProperty } from '@nestjs/swagger'
import { IsDefined, IsEnum, IsString } from 'class-validator'

import { ValidContact } from '../enums/ValidContact.enum'
import { CompanyContact } from '../types/json'

export class CompanyContactDTO implements CompanyContact {
    @ApiProperty({ enum: ValidContact, example: ValidContact.PHONE })
    @IsEnum(ValidContact)
    @IsDefined()
    type: ValidContact

    @ApiProperty({ example: '00000000000' })
    @IsString()
    @IsDefined()
    value: string
}
