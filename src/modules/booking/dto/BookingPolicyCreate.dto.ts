import { IsDefined, IsOptional, IsString } from 'class-validator'

export class BookingPolicyCrateDTO {
    @IsOptional()
    @IsString()
    type?: string

    @IsDefined()
    @IsString()
    description!: string

    @IsDefined()
    @IsString()
    companyId!: string
}
