import {
    Body,
    Controller,
    Delete,
    Get,
    Param,
    Patch,
    Post,
    Query,
} from '@nestjs/common'
import { CompanyContact } from '@prisma/client'

import { PaginationQueryDTO } from '@/common/dto/PaginationRequest.dto'
import { PaginatedResponse } from '@/common/types/pagination'

import { CompanyContactService } from './companyContact.service'
import { CompanyContactCreateDTO } from './dto/CompanyContactCreate.dto'

@Controller('company/:companyId/contact')
export class CompanyContactController {
    constructor(private companyContactService: CompanyContactService) {}

    @Post('create')
    create(
        @Param('companyId') companyId: string,
        @Body() data: CompanyContactCreateDTO,
    ) {
        return this.companyContactService.create(companyId, data)
    }

    @Get()
    list(
        @Param('companyId') companyId: string,
        @Query() paginationRequest: PaginationQueryDTO,
    ): Promise<PaginatedResponse<CompanyContact>> {
        return this.companyContactService.list(companyId, paginationRequest)
    }

    @Patch(':id')
    update(
        @Param('companyId') companyId: string,
        @Param('id') id: string,
        @Body() updatedData: CompanyContactCreateDTO,
    ) {
        return this.companyContactService.update(companyId, id, updatedData)
    }

    @Delete(':id')
    delete(@Param('companyId') companyId: string, @Param('id') id: string) {
        return this.companyContactService.delete(companyId, id)
    }
}
