import { Module } from '@nestjs/common'

import { PropertyController } from './property.controller'
import { PropertyService } from './property.service'

@Module({
    providers: [PropertyService],
    controllers: [PropertyController],
})
export class PropertyModule {}
