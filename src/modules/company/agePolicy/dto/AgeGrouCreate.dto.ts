import { IsDefined, IsInt, IsOptional, IsString } from 'class-validator'

export class AgeGroupCreateDTO {
    @IsDefined()
    @IsInt()
    initialAge!: number

    @IsDefined()
    @IsInt()
    finalAge!: number

    @IsDefined()
    @IsString()
    chargeType!: string

    @IsOptional()
    @IsInt()
    value?: number
}
