import { IsDefined, IsInt, IsOptional, IsString, IsUUID } from 'class-validator'

export class AgeGroupCreateDTO {
    @IsOptional()
    @IsUUID()
    id?: string

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
