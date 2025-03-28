import { ApiProperty } from '@nestjs/swagger'

import { ServiceHousingUnitTypeResponseDTO } from './ServiceHousingUnitTypeResponse.dto'
import { ServiceMediaResponseDTO } from './ServiceMediaResponse.dto'
import { ServiceResponseDTO } from './ServiceResponse.dto'

export class ServiceResponseFullDTO extends ServiceResponseDTO {
    @ApiProperty({ type: [ServiceMediaResponseDTO] })
    medias!: ServiceMediaResponseDTO[]

    @ApiProperty({ type: [ServiceHousingUnitTypeResponseDTO], nullable: true })
    availableHousingUnitTypes: ServiceHousingUnitTypeResponseDTO[] | null
}
