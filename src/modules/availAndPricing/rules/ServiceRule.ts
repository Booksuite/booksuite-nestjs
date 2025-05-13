import { Injectable } from '@nestjs/common'
import dayjs from 'dayjs'

import {
    UnavailabilityReason,
    UnavailableSource,
} from '../enum/UnavailableReason.enum'
import { PricingHelpers } from '../helpers/PricingHelpers'
import { AvailAndPricingService } from '../types'
import {
    AvailAndPricingDayPayload,
    AvailAndPricingRule,
    HousingUnitTypeAvailability,
} from '../types/payload'

@Injectable()
export class ServiceRule implements AvailAndPricingRule {
    constructor(private readonly pricingHelpers: PricingHelpers) {}

    apply(payload: AvailAndPricingDayPayload): AvailAndPricingDayPayload {
        const { currentDate, pricingPayload } = payload

        payload.calendar[currentDate].availability.push(
            ...this.checkServiceAvailability(payload),
        )

        const servicePrice = this.calculateServicesPrices(payload)

        payload.calendar[currentDate].servicesPrice = servicePrice

        payload.calendar[currentDate].finalPrice += servicePrice
        payload.calendar[currentDate].services = pricingPayload.services

        return payload
    }

    private calculateServicesPrices(
        payload: AvailAndPricingDayPayload,
    ): number {
        const { pricingPayload } = payload

        const searchPayload = pricingPayload.searchPayload

        if (!searchPayload) return 0

        const services = pricingPayload.services

        if (!services) return 0

        return services.reduce((acc, service) => {
            return acc + this.getServicePrice(service, payload)
        }, 0)
    }

    private getServicePrice(
        service: AvailAndPricingService,
        payload: AvailAndPricingDayPayload,
    ): number {
        const { currentDate, pricingPayload, calendar } = payload

        const searchPayload = pricingPayload.searchPayload

        if (!searchPayload) return 0

        const quantity = searchPayload.services?.find(
            (serv) => serv.serviceId === service.id,
        )?.quantity
        if (!quantity) return 0

        const totalChildren =
            searchPayload.ageGroups?.reduce((acc, group) => {
                return acc + group.quantity
            }, 0) ?? 0

        const totalGuests = searchPayload.adults + totalChildren
        const totalStay = searchPayload.totalStay

        const serviceOffer = pricingPayload.serviceOffers.find((offer) =>
            offer.validServices.some((serv) => serv.serviceId === service.id),
        )

        const serviceBasePrice = this.pricingHelpers.calculateBillingType(
            service.price,
            service.billingType,
            quantity,
            totalGuests,
            totalStay,
        )

        if (serviceOffer)
            return this.pricingHelpers.getPriceVariation(serviceBasePrice, {
                priceVariationType: serviceOffer.priceAdjustmentType,
                priceVariationValue: serviceOffer.priceAdjustmentValue,
            })

        return serviceBasePrice
    }

    private checkServiceAvailability(
        payload: AvailAndPricingDayPayload,
    ): HousingUnitTypeAvailability[] {
        const { currentDate, pricingPayload } = payload

        if (!pricingPayload.services.length) return []

        const newAvailability: HousingUnitTypeAvailability[] = []

        const totalStay = pricingPayload.searchPayload?.totalStay

        const minStayReach =
            !totalStay ||
            pricingPayload.services.every(
                (service) => totalStay > service.minStay,
            )

        if (!minStayReach)
            newAvailability.push(
                this.pricingHelpers.createAvailability(
                    false,
                    UnavailableSource.SERVICE,
                    UnavailabilityReason.MIN_DAYS_NOT_REACHED,
                ),
            )

        const serviceWeekDayAvailability = pricingPayload.services.every(
            (service) =>
                !service.availableWeekDays ||
                service.availableWeekDays.includes(
                    dayjs.utc(currentDate).day(),
                ),
        )

        if (!serviceWeekDayAvailability)
            newAvailability.push(
                this.pricingHelpers.createAvailability(
                    false,
                    UnavailableSource.SERVICE,
                    UnavailabilityReason.ITEM_UNAVAILABLE,
                ),
            )

        return newAvailability
    }
}
