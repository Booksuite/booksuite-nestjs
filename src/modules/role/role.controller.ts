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
import { RoleService } from './role.service'

@Controller('role')
export class RoleController {
    constructor(private userService: RoleService) {}

    @Post('create')
    create(@Body() data: RoleCreateDTO) {
        return this.userService.create(data)
    }

    @Get(':id')
    getById(@Param('id') id: string) {
        return this.userService.getById(id)
    }

    @Patch(':id')
    update(@Param('id') id: string, data: RoleCreateDTO) {
        return this.userService.update(id, data)
    }

    @Delete(':id')
    delete(@Param('id') id: string) {
        return this.userService.delete(id)
    }
}
