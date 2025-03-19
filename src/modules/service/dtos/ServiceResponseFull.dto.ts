import { ApiProperty } from '@nestjs/swagger'

import { HousingUnitTypeResponseDTO } from '@/modules/housingUnitType/dto/HousingUnitTypeResponse.dto'

import { ServiceHousingUnitTypeResponseDTO } from './ServiceHousingUnitTypeResponse.dto'
import { ServiceMediaResponseDTO } from './ServiceMediaResponse.dto'
import { ServiceResponseDTO } from './ServiceResponse.dto'

export class ServiceResponseFullDTO extends ServiceResponseDTO {
    @ApiProperty({ type: [ServiceMediaResponseDTO] })
    medias!: ServiceMediaResponseDTO[]

    @ApiProperty({ type: [HousingUnitTypeResponseDTO], nullable: true })
    housingUnitType: ServiceHousingUnitTypeResponseDTO[]
}
