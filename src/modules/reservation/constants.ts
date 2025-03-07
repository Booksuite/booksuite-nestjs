import { ReservationSaleChannel } from '@prisma/client'

export const RESERVATION_CODE_CHANNEL_MAPPING: Record<
    ReservationSaleChannel,
    string
> = {
    [ReservationSaleChannel.BOOKSUITE]: 'BK',
    [ReservationSaleChannel.RECEPTION]: 'RC',
    [ReservationSaleChannel.PHONE]: 'PH',
    [ReservationSaleChannel.WHATSAPP]: 'WA',
    [ReservationSaleChannel.INSTAGRAM]: 'IG',
    [ReservationSaleChannel.TIKTOK]: 'TK',
    [ReservationSaleChannel.EMAIL]: 'EM',
    [ReservationSaleChannel.OTHER]: 'OT',
}
