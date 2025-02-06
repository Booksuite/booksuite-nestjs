import { Module } from '@nestjs/common'
import { PrismaService } from 'src/prisma.service'

import { PropertyController } from './property.controller'
import { PropertyService } from './property.service'

@Module({
    providers: [PropertyService, PrismaService],
    controllers: [PropertyController],
})
export class PropertyModule {}
