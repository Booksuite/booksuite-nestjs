import { ApiProperty } from '@nestjs/swagger'
import { IsDefined, IsUUID } from 'class-validator'

export class CompanyFacilityDTO {
    @ApiProperty({ example: '123e4567-e89b-12d3-a456-426614174000' })
    @IsDefined()
    @IsUUID()
    facilityId: string
}
