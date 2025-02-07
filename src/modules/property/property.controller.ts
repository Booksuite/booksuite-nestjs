import {
    Body,
    Controller,
    Delete,
    Get,
    Param,
    Patch,
    Post,
} from '@nestjs/common'

import { Property } from '@/common/models/generated/models'

import { PropertyService } from './property.service'

@Controller('property')
export class PropertyController {
    constructor(private propertyService: PropertyService) {}

    @Post('create')
    createNewProperty(@Body() propertyData: Property) {
        return this.propertyService.createProperty(propertyData)
    }

    @Get(':id')
    getPropertyByID(@Param('id') id: string) {
        return this.propertyService.getPropertyByID(parseInt(id))
    }

    @Patch(':id')
    updatePropertyData(@Param('id') id: string, @Body() updatedData: Property) {
        return this.propertyService.updateProperty(parseInt(id), updatedData)
    }

    @Delete(':id')
    deleteProperty(@Param('id') id: string) {
        return this.propertyService.deleteProperty(parseInt(id))
    }
}
