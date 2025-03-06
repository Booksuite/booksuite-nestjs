import { ApiProperty } from '@nestjs/swagger'

import { ServiceCategoryResponseDTO } from './ServiceCategoryResponse.dto'
import { ServiceMediaResponseDTO } from './ServiceMediaResponse.dto'
import { ServiceResponseDTO } from './ServiceResponse.dto'

export class ServiceResponseFullDTO extends ServiceResponseDTO {
    @ApiProperty({ type: [ServiceMediaResponseDTO] })
    medias!: ServiceMediaResponseDTO[]

    @ApiProperty({ type: ServiceCategoryResponseDTO, nullable: true })
    category: ServiceCategoryResponseDTO | null
}
