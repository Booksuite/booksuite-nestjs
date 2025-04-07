import { ApiProperty } from '@nestjs/swagger'
import { IsDefined, IsUUID } from 'class-validator'

export class SpecialDateServiceDTO {
    @ApiProperty({
        example: 'f47ac10b-58cc-4372-a567-0e02b2c3d479',
        type: String,
    })
    @IsDefined()
    @IsUUID()
    serviceId: string
}
