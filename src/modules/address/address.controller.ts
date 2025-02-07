import {
    Body,
    Controller,
    Delete,
    Get,
    Param,
    Patch,
    Post,
} from '@nestjs/common'

import { Address } from '@/common/models/generated/models'

import { AddressService } from './address.service'

@Controller('address')
export class AddressController {
    constructor(private addressService: AddressService) {}

    @Post('create')
    createAddress(@Body() addressData: Address) {
        return this.addressService.createAddress(addressData)
    }

    @Get(':id')
    getAddress(@Param('id') id: string) {
        return this.addressService.getAddress(parseInt(id))
    }

    @Patch(':id')
    updateAddress(@Param('id') id: string, @Body() addressData: Address) {
        return this.addressService.updateAddress(addressData, parseInt(id))
    }

    @Delete(':id')
    deleteAdress(@Param('id') id: string) {
        return this.addressService.deleteAddress(parseInt(id))
    }
}
