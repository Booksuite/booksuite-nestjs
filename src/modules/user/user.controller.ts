import {
    Body,
    Controller,
    Delete,
    Get,
    Param,
    Patch,
    Post,
} from '@nestjs/common'

import { UserCreateDTO } from './dto/UserCreate.dto'
import { UserUpdateDTO } from './dto/UserUpdate.dto'
import { UserService } from './user.service'

@Controller('user')
export class UserController {
    constructor(private userService: UserService) {}

    @Post('create')
    create(@Body() data: UserCreateDTO) {
        return this.userService.create(data)
    }

    @Get(':id')
    getById(@Param('id') id: string) {
        return this.userService.getById(id)
    }

    @Patch(':id')
    update(@Param('id') id: string, @Body() data: UserUpdateDTO) {
        return this.userService.update(id, data)
    }

    @Delete(':id')
    delete(@Param('id') id: string) {
        return this.userService.delete(id)
    }
}
