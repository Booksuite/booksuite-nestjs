import { AgeGroup, Prisma } from '@prisma/client'

export type AvailAndPricingHostingRules = Prisma.HostingRulesGetPayload<{
    select: {
        id: true
        checkIn: true
        checkOut: true
        minStay: true
        fixedWindowPeriod: true
        availableWeekend: true
        availableWeekDays: true
    }
}> & {
    reservationWindowStart: string | null
    reservationWindowEnd: string | null
}
export type AvailAndPricingSeasonRules = Prisma.SeasonRulesGetPayload<{
    include: {
        housingUnitTypePrices: {
            select: {
                housingUnitTypeId: true
                baseWeekPrice: true
                finalWeekPrice: true
                baseWeekendPrice: true
                finalWeekendPrice: true
            }
        }
    }
}>

export type AvailAndPricingService = Prisma.ServiceGetPayload<{
    omit: {
        companyId: true
        createdAt: true
        updatedAt: true
        hostingRulesId: true
        coverMediaId: true
        hosting: true
    }
}>

export type AvailAndPricingRateOption = Prisma.RateOptionGetPayload<{
    include: {
        ageGroupPrices: true
    }
    omit: {
        companyId: true
        createdAt: true
        updatedAt: true
    }
}>

export type AvailAndPricingAgeGroup = AgeGroup & {
    quantity: number
}

export type AvailAndPricingSpecialDates = Prisma.SpecialDateGetPayload<{
    include: {
        includedServices: { omit: { specialDateId: true } }
        housingUnitTypePrices: {
            select: {
                housingUnitTypeId: true
                baseWeekPrice: true
                finalWeekPrice: true
                baseWeekendPrice: true
                finalWeekendPrice: true
            }
        }
    }
}>

export type AvailAndPricingOffer = Prisma.OfferGetPayload<{
    include: {
        validHousingUnitTypes: { select: { housingUnitTypeId: true } }
        validServices: { select: { serviceId: true } }
    }
}>

export type AvailAndPricingHousingUnitType = Prisma.HousingUnitTypeGetPayload<{
    include: {
        housingUnits: { orderBy: { order: 'asc' } }
    }
}>

export type AvailAndPricingReservation = Omit<
    Prisma.ReservationGetPayload<{
        include: { housingUnit: true; guestUser: true; housingUnitType: true }
        omit: { summary: true }
    }>,
    'startDate' | 'endDate' | 'preOrderExpiraiton'
> & {
    startDate: string
    endDate: string
    preOrderExpiraiton: string | null
}
