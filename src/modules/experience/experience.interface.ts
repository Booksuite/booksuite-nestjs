import { Prisma } from '@prisma/client'

export interface ExperiencePayload {
    name: string
    status?: string | null
    minDaily: number
    minNotice: number

    onlineSale: boolean
    panelSale: boolean
    seasonalSale: boolean

    seasonStart: Date
    seasonEnd: Date
    hosting?: Prisma.InputJsonValue
    nights?: Prisma.InputJsonValue

    description: string
    notes: string
    videoUrl?: string | null

    price: number
    priceAdjustment?: string | null
    discount: number
    billType: string
    medias?: object
}
