import { IsDefined, IsString } from 'class-validator'

export class ServiceCategoryCreateDTO {
    @IsDefined()
    @IsString()
    name!: string
}
