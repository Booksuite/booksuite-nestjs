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

import { Company } from '@/common/models/generated/models'

import { SaveCompanyPayload } from './company.interface'
import { CompanyService } from './company.service'

@Controller('company')
export class CompanyController {
    constructor(private companyService: CompanyService) {}

    @Post('signUpCompany')
    async signUpCompany(@Body() companyData: Company, @Res() res: Response) {
        try {
            //if the number of values in the data object is equals to 26 (number of keys in company.interface)
            if (Object.values(companyData).length == 26) {
                const createdData =
                    await this.companyService.createCompany(companyData)
                return res.status(201).json(createdData)
            }

            return res
                .status(400)
                .json({ message: 'Data type is incorrectly formed.' })
        } catch (error) {
            return res.status(500).json({
                message: `(Internal Server Error) on creating company data: ${error}`,
            })
        }
    }

    @Get('getCompany/:id')
    async getCompanyByID(@Param('id') id: string, @Res() res: Response) {
        const returnedData = await this.companyService.getCompanyByID(
            parseInt(id),
        )

        if (returnedData) {
            res.status(200).json(returnedData)
        }

        res.status(400).json({ message: 'Data not found.' })
    }

    @Patch('updateCompany/:id')
    async updateCompanyData(
        @Param('id') id: string,
        @Body() updatedData: SaveCompanyPayload,
        @Res() res: Response,
    ) {
        try {
            const updateData = await this.companyService.updateCompany(
                parseInt(id),
                updatedData,
            )
            return res.status(200).json(updateData)
        } catch (error) {
            return res.status(500).json({
                message: `(Internal Server Error) on updating company data: ${error}`,
            })
        }
    }

    @Delete('deleteCompany/:id')
    async deleteCompany(@Param('id') id: string, @Res() res: Response) {
        const deletedData = await this.companyService.deleteCompany(
            parseInt(id),
        )

        if (deletedData) {
            return res.status(200).json({
                message: `Company (${deletedData.companyName}) deleted successfuly.`,
            })
        }

        return res
            .status(400)
            .json({ message: `Company not found with id(${id})` })
    }
}
