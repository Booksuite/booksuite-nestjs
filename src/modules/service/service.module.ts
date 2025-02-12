import { Module } from '@nestjs/common'

import { SericeController } from './service.controller'
import { ServiceService } from './service.service'

@Module({
    providers: [ServiceService],
    controllers: [SericeController],
})
export class ServiceModule {}
