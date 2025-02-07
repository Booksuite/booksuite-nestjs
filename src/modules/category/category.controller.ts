import {
    Body,
    Controller,
    Delete,
    Get,
    Param,
    Patch,
    Post,
} from '@nestjs/common'

import { Category } from '@/common/models/generated/models'

import { CategoryService } from './category.service'

@Controller('category')
export class CategoryController {
    constructor(private categoryService: CategoryService) {}

    @Post('create')
    createCategory(@Body() categoryData: Category) {
        return this.categoryService.createCategory(categoryData)
    }

    @Get(':id')
    getCategory(@Param('id') id: string) {
        return this.categoryService.getCategory(parseInt(id))
    }

    @Patch(':id')
    updateCategory(@Param('id') id: string, @Body() categoryData: Category) {
        return this.categoryService.updateCategory(categoryData, parseInt(id))
    }

    @Delete(':id')
    deleteCategory(@Param('id') id: string) {
        return this.categoryService.deleteCategory(parseInt(id))
    }
}
