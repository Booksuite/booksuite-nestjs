import { ApiProperty } from '@nestjs/swagger'

import { ServiceMediaResponseDTO } from './ServiceMediaResponse.dto'
import { ServiceResponseDTO } from './ServiceResponse.dto'

export class ServiceResponseFullDTO extends ServiceResponseDTO {
    @ApiProperty({ type: [ServiceMediaResponseDTO] })
    medias!: ServiceMediaResponseDTO[]
}
