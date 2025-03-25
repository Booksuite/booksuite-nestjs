import { ApiProperty } from '@nestjs/swagger'
import { IsDefined } from 'class-validator'

import { InstallmentsTax } from '@/common/types/json'

export class InstallmentsTaxDTO implements InstallmentsTax {
    @ApiProperty({ type: Number, example: 1.5 })
    @IsDefined()
    tax: number
}
