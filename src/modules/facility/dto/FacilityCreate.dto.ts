import { IsDefined, IsString } from 'class-validator'

export class FacilityCreateDTO {
    @IsDefined()
    @IsString()
    name!: string
}
