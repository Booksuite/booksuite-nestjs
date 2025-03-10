import { mixin } from '@nestjs/common'
import { ApiProperty, ApiPropertyOptions } from '@nestjs/swagger'

// eslint-disable-next-line @typescript-eslint/no-empty-object-type
type Constructor<T = {}> = new (...args: any[]) => T

export function withPaginatedResponse<T extends Constructor>(
    Base: T,
    options?: ApiPropertyOptions,
) {
    class PaginatedResponseDTO {
        @ApiProperty({ type: Base, isArray: true, ...options })
        items: Array<InstanceType<T>>

        @ApiProperty({ example: 10 })
        totalItems: number

        @ApiProperty({ example: 2 })
        totalPages: number

        @ApiProperty({ example: 1 })
        currentPage: number

        @ApiProperty({ example: 1, type: Number, nullable: true })
        prevPage: number | null

        @ApiProperty({ example: 2, type: Number, nullable: true })
        nextPage: number | null
    }

    return mixin(PaginatedResponseDTO)
}
