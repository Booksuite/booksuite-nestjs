import { IsDefined, IsString } from 'class-validator'

export class FacilityDTO {
    @IsDefined()
    @IsString()
    name!: string
}
