import { Injectable } from '@nestjs/common'

import { Category } from '@/common/models/generated/models'
import { PrismaService } from '@/modules/prisma/prisma.service'

@Injectable()
export class CategoryService {
    constructor(private prismaService: PrismaService) {}

    createCategory(categoryData: Category) {
        return this.prismaService.category.create({ data: categoryData })
    }

    getCategory(categoryID: number) {
        return this.prismaService.category.findUnique({
            where: { id: categoryID },
        })
    }

    updateCategory(categoryData: Category, categoryID: number) {
        return this.prismaService.category.update({
            where: { id: categoryID },
            data: categoryData,
        })
    }

    deleteCategory(categoryID: number) {
        return this.prismaService.category.delete({
            where: { id: categoryID },
        })
    }
}
