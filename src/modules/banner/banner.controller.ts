import {
    Body,
    Controller,
    Delete,
    Get,
    Param,
    Patch,
    Post,
} from '@nestjs/common'
import {
    ApiExtraModels,
    ApiOkResponse,
    ApiParam,
    getSchemaPath,
} from '@nestjs/swagger'

import { PaginationQuery } from '@/common/types/pagination'

import { BannerService } from './banner.service'
import { BannerCreateDTO } from './dto/BannerCreate.dto'
import { BannerOrderByDTO } from './dto/BannerOrderBy.dto'
import { BannerResponseDTO } from './dto/BannerResponse.dto'
import { BannerResponseFullDTO } from './dto/BannerResponseFull.dto'
import { BannerResponsePaginatedDTO } from './dto/BannerResponsePaginated.dto'

@ApiExtraModels(BannerResponseFullDTO)
@Controller('company/:companyId/banner')
export class BannerController {
    constructor(private bannerService: BannerService) {}

    @ApiOkResponse({ type: BannerResponseDTO })
    @Post('create')
    create(
        @Param('companyId') companyId: string,
        @Body() bannerData: BannerCreateDTO,
    ): Promise<BannerResponseDTO> {
        return this.bannerService.create(companyId, bannerData)
    }

    @ApiOkResponse({ type: BannerResponsePaginatedDTO })
    @ApiParam({ name: 'companyId', type: String })
    @Post('list')
    listByCompanyId(
        @Param('companyId') companyId: string,
        @Body('pagination') pagination: PaginationQuery,
        @Body('order') order: BannerOrderByDTO,
    ): Promise<BannerResponsePaginatedDTO> {
        return this.bannerService.listByCompanyId(companyId, pagination, order)
    }

    @ApiOkResponse({
        schema: {
            oneOf: [
                { $ref: getSchemaPath(BannerResponseFullDTO) },
                { type: 'null' },
            ],
        },
    })
    @ApiParam({ name: 'companyId', type: String })
    @Get(':id')
    getById(@Param('id') id: string): Promise<BannerResponseFullDTO | null> {
        return this.bannerService.getById(id)
    }

    @ApiOkResponse({ type: BannerResponseDTO })
    @ApiParam({ name: 'companyId', type: String })
    @Patch(':id')
    update(
        @Param('id') id: string,
        @Body() bannerData: BannerCreateDTO,
    ): Promise<BannerResponseDTO> {
        return this.bannerService.update(id, bannerData)
    }

    @ApiParam({ name: 'companyId', type: String })
    @Delete(':id')
    delete(@Param('id') id: string) {
        return this.bannerService.delete(id)
    }
}
