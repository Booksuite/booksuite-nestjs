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
    }
}>

export type AvailAndPricingHousingUnitType = Prisma.HousingUnitTypeGetPayload<{
    include: {
        housingUnits: { orderBy: { order: 'asc' } }
    }
    omit: {
        companyId: true
    }
}>
