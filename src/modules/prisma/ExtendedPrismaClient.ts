import { Prisma, PrismaClient } from '@prisma/client'

export type CustomPrismaClient = ReturnType<typeof customPrismaClient>

export const customPrismaClient = () => {
    const prismaClient = new PrismaClient()

    return prismaClient.$extends({
        name: 'findManyAndCount',
        model: {
            $allModels: {
                async findManyAndCount<Model, Args>(
                    this: Model,
                    args: Prisma.Args<Model, 'findMany'>,
                ): Promise<[Prisma.Result<Model, Args, 'findMany'>, number]> {
                    const context = Prisma.getExtensionContext(this)

                    return prismaClient.$transaction([
                        (context as any).findMany(args),
                        (context as any).count({ where: args.where }),
                    ]) as Promise<
                        [Prisma.Result<Model, Args, 'findMany'>, number]
                    >
                },
            },
        },
    })
}

export const ExtendedPrismaClient = class {
    constructor() {
        return customPrismaClient()
    }
} as new () => ReturnType<typeof customPrismaClient>
