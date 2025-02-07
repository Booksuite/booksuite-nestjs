import {
    Body,
    Controller,
    Delete,
    Get,
    Param,
    Patch,
    Post,
} from '@nestjs/common'

import { Guest } from '@/common/models/generated/models'

import { GuestService } from './guest.service'

@Controller('guest')
export class GuestController {
    constructor(private guestService: GuestService) {}

    @Post('create')
    assignGuest(@Body() guestData: Guest) {
        return this.guestService.assignGuest(guestData)
    }

    @Get(':id')
    getGuest(@Param('id') id: string) {
        return this.guestService.getGuest(parseInt(id))
    }

    @Patch(':id')
    updateGuest(@Param('id') id: string, @Body() guestData: Guest) {
        return this.guestService.updateGuest(guestData, parseInt(id))
    }

    @Delete(':id')
    deleteGuest(@Param('id') id: string) {
        return this.guestService.deleteGuest(parseInt(id))
    }
}
