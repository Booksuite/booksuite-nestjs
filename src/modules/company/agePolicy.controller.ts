import { Body, Controller, Param, Post } from '@nestjs/common'

import { AgePolicyService } from './agePolicy.service'
import { AgePolicyCreateDTO } from './dto/AgePolicyCreate.dto'

@Controller('company/:companyId/agePolicy')
export class AgePolicyController {
    constructor(private agePolicyService: AgePolicyService) {}

    @Post('upsert')
    upsert(
        @Param('companyId') companyId: string,
        @Body() data: AgePolicyCreateDTO,
    ) {
        return this.agePolicyService.upsert(companyId, data)
    }

    // @Get()
    // list(
    //     @Param('companyId') companyId: string,

    // ): Promise<PaginatedResponse<CompanyContact>> {
    //     return this.agePolicyService.getById(paginationRequest)
    // }

    // @Patch(':id')
    // update(
    //     @Param('companyId') companyId: string,
    //     @Param('id') id: string,
    //     @Body() updatedData: CompanyContactCreateDTO,
    // ) {
    //     return this.agePolicyService.update(companyId, id, updatedData)
    // }

    // @Delete(':id')
    // delete(@Param('companyId') companyId: string, @Param('id') id: string) {
    //     return this.agePolicyService.delete(companyId, id)
    // }
}
