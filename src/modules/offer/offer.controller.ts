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

import { CreateOfferDto } from './dto/create-offer.dto'
import { OfferResponseDTO } from './dto/offer-response.dto'
import { OfferResponsePaginatedDTO } from './dto/OfferResponsePaginated.dto'
import { OfferSearchBodyDTO } from './dto/OfferSearchBody.dto'
import { UpdateOfferDto } from './dto/update-offer.dto'
import { OfferService } from './offer.service'

@ApiExtraModels(OfferResponseDTO)
@Controller('company/:companyId/offers')
export class OfferController {
    constructor(private readonly offerService: OfferService) {}

    @ApiOkResponse({ type: OfferResponseDTO })
    @ApiOperation({ operationId: 'createOffer' })
    @Post()
    create(
        @Param('companyId') companyId: string,
        @Body() createOfferDto: CreateOfferDto,
    ) {
        return this.offerService.create(companyId, createOfferDto)
    }

    @ApiOkResponse({
        schema: {
            oneOf: [
                { $ref: getSchemaPath(OfferResponseDTO) },
                { type: 'null' },
            ],
        },
    })
    @ApiOperation({ operationId: 'getOfferById' })
    @Get(':id')
    getById(@Param('id') id: string) {
        return this.offerService.getById(id)
    }

    @ApiBody({ type: UpdateOfferDto })
    @ApiOkResponse({ type: OfferResponseDTO })
    @ApiOperation({ operationId: 'updateOffer' })
    @ApiParam({ name: 'companyId', type: String })
    @Patch(':id')
    update(@Param('id') id: string, @Body() updateOfferDto: UpdateOfferDto) {
        return this.offerService.update(id, updateOfferDto)
    }

    @ApiOperation({ operationId: 'deleteOffer' })
    @Delete(':id')
    delete(@Param('id') id: string) {
        return this.offerService.delete(id)
    }

    @ApiBody({ type: OfferSearchBodyDTO })
    @ApiQuery({ name: 'query', type: String, required: false })
    @ApiOkResponse({ type: OfferResponsePaginatedDTO })
    @ApiOperation({ operationId: 'searchOffers' })
    @Post('search')
    search(
        @Param('companyId') companyId: string,
        @Query('query') query: string,
        @Body() body: OfferSearchBodyDTO,
    ): Promise<OfferResponsePaginatedDTO> {
        return this.offerService.search(
            companyId,
            body.pagination,
            body.order,
            query,
            body.filter,
        )
    }
}
