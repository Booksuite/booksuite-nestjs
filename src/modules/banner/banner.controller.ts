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
import {
    ApiBody,
    ApiExtraModels,
    ApiOkResponse,
    ApiOperation,
    ApiParam,
    ApiQuery,
    getSchemaPath,
} from '@nestjs/swagger'

import { BannerService } from './banner.service'
import { BannerCreateDTO } from './dto/BannerCreate.dto'
import { BannerResponseDTO } from './dto/BannerResponse.dto'
import { BannerResponseFullDTO } from './dto/BannerResponseFull.dto'
import { BannerResponsePaginatedDTO } from './dto/BannerResponsePaginated.dto'
import { BannerSearchBodyDTO } from './dto/BannerSearchBody.dto'

@ApiExtraModels(BannerResponseFullDTO)
@Controller('company/:companyId/banner')
export class BannerController {
    constructor(private bannerService: BannerService) {}

    @ApiOkResponse({ type: BannerResponseDTO })
    @ApiBody({ type: BannerCreateDTO })
    @ApiOperation({ operationId: 'createBanner' })
    @Post('create')
    create(
        @Param('companyId') companyId: string,
        @Body() bannerData: BannerCreateDTO,
    ): Promise<BannerResponseDTO> {
        return this.bannerService.create(companyId, bannerData)
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
    @ApiOperation({ operationId: 'getBannerById' })
    @Get(':id')
    getById(@Param('id') id: string): Promise<BannerResponseFullDTO | null> {
        return this.bannerService.getById(id)
    }

    @ApiBody({ type: BannerCreateDTO })
    @ApiOkResponse({ type: BannerResponseDTO })
    @ApiParam({ name: 'companyId', type: String })
    @ApiOperation({ operationId: 'updateBanner' })
    @Patch(':id')
    update(
        @Param('id') id: string,
        @Body() bannerData: BannerCreateDTO,
    ): Promise<BannerResponseDTO> {
        return this.bannerService.update(id, bannerData)
    }

    @Post('search')
    @ApiParam({ name: 'companyId', type: String })
    @ApiBody({ type: BannerSearchBodyDTO })
    @ApiOkResponse({ type: BannerResponsePaginatedDTO })
    @ApiQuery({ name: 'query', type: String, required: false })
    @ApiOperation({ operationId: 'searchBanners' })
    search(
        @Param('companyId') companyId: string,
        @Body() body: BannerSearchBodyDTO,
        @Query('query') query?: string,
    ): Promise<BannerResponsePaginatedDTO> {
        return this.bannerService.search(
            companyId,
            body.pagination,
            body.filter,
            body.order,
            query,
        )
    }

    @ApiParam({ name: 'companyId', type: String })
    @ApiOperation({ operationId: 'deleteBanner' })
    @Delete(':id')
    delete(@Param('id') id: string) {
        return this.bannerService.delete(id)
    }
}
