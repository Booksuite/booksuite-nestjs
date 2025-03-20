import {
    Body,
    Controller,
    Delete,
    Get,
    Param,
    Patch,
    Post,
} from '@nestjs/common'

import { RoleCreateDTO } from './dto/RoleCreate.dto'
import { RoleUpdateDTO } from './dto/RoleUpdate.dto'
import { RoleService } from './role.service'

@Controller('role')
export class RoleController {
    constructor(private roleService: RoleService) {}

    @Post('create')
    create(@Body() data: RoleCreateDTO) {
        return this.roleService.create(data)
    }

    @Get(':id')
    getById(@Param('id') id: string) {
        return this.roleService.getById(id)
    }

    @Patch(':id')
    update(@Param('id') id: string, @Body() data: RoleUpdateDTO) {
        return this.roleService.update(id, data)
    }

    @Delete(':id')
    delete(@Param('id') id: string) {
        return this.roleService.delete(id)
    }
}
