import { ApiProperty } from '@nestjs/swagger'

import { ValidContact } from '../enums/ValidContact.enum'
import { CompanyContact } from '../types/json'

export class CompanyContactResponseDTO implements CompanyContact {
    @ApiProperty({ enum: ValidContact, example: ValidContact.PHONE })
    type: ValidContact

    @ApiProperty({ example: '00000000000' })
    value: string
}
