export interface PropertySavePayload {
    name: string
    slug: string
    description: string

    // guests
    avaiableGuests?: number
    minGuests?: number
    maxGuests?: number
    maxAdults?: number
    maxChildren?: number

    // pricing
    weekdaysPrice: number
    weekendPrice: number
    extraAdultPrice: number
    extraAdultPriceQtd: number

    videoUrl?: string
    addressId?: number
    companyId?: number | null
}
