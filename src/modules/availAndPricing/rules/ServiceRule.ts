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
        const { currentDate } = payload

        payload.calendar[currentDate].availability =
            this.checkServiceAvailability(payload)

        const servicePrice = this.calculateServicesPrices(payload)

        payload.calendar[currentDate].servicesPrice = servicePrice

        payload.calendar[currentDate].finalPrice += servicePrice

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

        const totalGuests = searchPayload.adults
        const totalStay = searchPayload.totalStay

        const serviceOffer = pricingPayload.serviceOffers.find((offer) =>
            offer.validServices.some((serv) => serv.serviceId === service.id),
        )

        const isServiceIncluded = !!calendar[
            currentDate
        ].specialDates[0]?.includedServices.some(
            (serv) => serv.serviceId === service.id,
        )

        if (isServiceIncluded) return 0

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
        const { currentDate, pricingPayload, calendar } = payload

        const currentDay = calendar[currentDate]
        const currentAvailability = currentDay.availability

        if (!pricingPayload.services.length) return currentAvailability

        const totalStay = pricingPayload.searchPayload?.totalStay

        const minStayReach =
            !totalStay ||
            pricingPayload.services.every(
                (service) => totalStay > service.minStay,
            )

        if (!minStayReach)
            currentAvailability.push(
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
            currentAvailability.push(
                this.pricingHelpers.createAvailability(
                    false,
                    UnavailableSource.SERVICE,
                    UnavailabilityReason.ITEM_UNAVAILABLE,
                ),
            )

        return currentAvailability
    }
}
