import { Module } from '@nestjs/common'

import { RoleController } from './role.controller'
import { RoleService } from './role.service'

@Module({
    providers: [RoleService],
    controllers: [RoleController],
})
export class RoleModule {}
