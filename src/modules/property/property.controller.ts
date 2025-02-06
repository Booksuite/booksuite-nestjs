import {
    Body,
    Controller,
    Delete,
    Get,
    Param,
    Patch,
    Post,
    Res,
} from '@nestjs/common'
import { Response } from 'express'

import { PropertySavePayload } from './property.interface'
import { PropertyService } from './property.service'

@Controller('property')
export class PropertyController {
    constructor(private propertyService: PropertyService) {}

    @Post('createProperty')
    async createNewProperty(
        @Body() propertyData: PropertySavePayload,
        @Res() res: Response,
    ) {
        try {
            if (Object.values(propertyData).length == 15) {
                const createdData =
                    await this.propertyService.createProperty(propertyData)

                if (createdData) {
                    return res.status(201).json(createdData)
                }
            }

            return res
                .status(400)
                .json({ message: 'Data type incorrectly formed.' })
        } catch (error) {
            throw res.status(500).json({
                message: `(Internal Server Error) on creating property data: ${error}`,
            })
        }
    }

    @Get('getProperty/:id')
    async getPropertyByID(@Param('id') id: string, @Res() res: Response) {
        const data = await this.propertyService.getPropertyByID(parseInt(id))

        if (!!data && Object.keys(data).length != 0) {
            return res.status(200).json(data)
        }

        return res.status(400).json({ message: `No data found with id: ${id}` })
    }

    @Patch('updateProperty/:id')
    async updatePropertyData(
        @Param('id') id: string,
        @Body() updatedData: PropertySavePayload,
        @Res() res: Response,
    ) {
        try {
            const newData = await this.propertyService.updateProperty(
                parseInt(id),
                updatedData,
            )
            return res.status(200).json(newData)
        } catch (error) {
            return res.status(500).json({
                message: `(Internal Server Error) on updating property data: ${error}`,
            })
        }
    }

    @Delete('deleteProperty/:id')
    async deleteProperty(@Param('id') id: string, @Res() res: Response) {
        try {
            const deletedData = await this.propertyService.deleteProperty(
                parseInt(id),
            )

            if (deletedData) {
                return res.status(500).json({
                    message: `Property (${deletedData.name}) data sucessfuly deleted.`,
                })
            }
        } catch (error) {
            return res.status(500).json({
                message: `(Internal Server Error) on deleting property data: ${error}`,
            })
        }
    }

    @Get('getCompanyProperties/:id')
    async getCompanyProperties(
        @Param('id') companyID: string,
        @Res() res: Response,
    ) {
        try {
            const propertiesFromCompany =
                await this.propertyService.getCompanyProperties(
                    parseInt(companyID),
                )

            console.log(propertiesFromCompany)

            if (
                !!propertiesFromCompany &&
                Object.keys(propertiesFromCompany).length > 0
            ) {
                return res.status(200).json(propertiesFromCompany)
            }

            return res
                .status(400)
                .json({ message: `No properties found for that company.` })
        } catch (error) {
            return res.status(500).json({
                message: `(Internal Server Error) on getting properties from company: ${error}`,
            })
        }
    }
}
