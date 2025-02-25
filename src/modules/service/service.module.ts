import { Module } from '@nestjs/common'

import { ServiceController } from './service.controller'
import { ServiceService } from './service.service'

@Module({
    providers: [ServiceService],
    controllers: [ServiceController],
})
export class ServiceModule {}
