import { Injectable } from '@nestjs/common'
import { BillingType, PriceVariationType } from '@prisma/client'
import dayjs from 'dayjs'

import { UNAVAILABLE_REASON_MESSAGE } from '../constants'
import {
    UnavailabilityReason,
    UnavailableSource,
} from '../enum/UnavailableReason.enum'
import { HousingUnitTypeAvailability } from '../types/payload'

@Injectable()
export class PricingHelpers {
    isWeekend(
        houstingRules: { availableWeekend: number[] },
        date: string,
    ): boolean {
        const dateDayjs = dayjs.utc(date)

        return houstingRules.availableWeekend.includes(dateDayjs.day())
    }

    getPriceVariation(
        basePrice: number,
        item: {
            priceVariationType: PriceVariationType
            priceVariationValue: number
        },
    ): number {
        switch (item.priceVariationType) {
            case PriceVariationType.ABSOLUTE_INCREASE:
                return basePrice + item.priceVariationValue
            case PriceVariationType.ABSOLUTE_REDUCTION:
                return basePrice - item.priceVariationValue
            case PriceVariationType.PERCENTAGE_INCREASE:
                return basePrice * (1 + item.priceVariationValue / 100)
            case PriceVariationType.PERCENTAGE_REDUCTION:
                return basePrice * (1 - item.priceVariationValue / 100)
            case PriceVariationType.CUSTOM:
                return item.priceVariationValue
            default:
                return basePrice
        }
    }

    calculateBillingType(
        basePrice: number,
        billingType: BillingType,
        quantity: number,
        totalGuests: number,
        totalStay: number,
    ): number {
        switch (billingType) {
            case BillingType.PER_HOUSING_UNIT:
                return basePrice * quantity
            case BillingType.PER_GUEST:
                return basePrice * totalGuests * quantity
            case BillingType.DAILY:
                return basePrice * totalStay
            case BillingType.PER_RESERVATION:
                return basePrice
            case BillingType.PER_GUEST_DAILY:
                return basePrice * totalGuests * totalStay
            default:
                return basePrice
        }
    }

    createAvailability(available: true): HousingUnitTypeAvailability
    createAvailability(
        available: false,
        source: UnavailableSource,
        reason: UnavailabilityReason,
        message?: string,
    ): HousingUnitTypeAvailability
    createAvailability(
        available: boolean,
        source?: UnavailableSource,
        reason?: UnavailabilityReason,
        message?: string,
    ): HousingUnitTypeAvailability {
        if (available) {
            return {
                available,
                unavailabilitySource: null,
                unavailableReason: null,
                unavailableReasonMessage: null,
            }
        }

        if (!source || !reason) {
            throw new Error('Source and reason are required')
        }

        return {
            available: false,
            unavailabilitySource: source,
            unavailableReason: reason,
            unavailableReasonMessage:
                message || UNAVAILABLE_REASON_MESSAGE[reason],
        }
    }
}
