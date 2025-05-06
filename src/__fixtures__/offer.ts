import { faker } from '@faker-js/faker/.'
import {
    Offer,
    OfferHousingUnitType,
    PriceVariationType,
    Prisma,
} from '@prisma/client'
import dayjs from 'dayjs'
import { defineFixture } from 'efate'

export const offerFixture = defineFixture<Offer>((fx) => {
    fx.id.as(() => faker.string.uuid())
    fx.name.as(() => faker.lorem.word())
    fx.description.as(() => faker.lorem.sentence())
    fx.published.as(() => true)
    fx.visibilityStartDate.as(() =>
        dayjs.utc('2025-05-01T00:00:00.000Z').toDate(),
    )

    fx.startDate.as(() => dayjs.utc('2025-05-01T00:00:00.000Z').toDate())
    fx.endDate.as(() => dayjs.utc('2025-05-31T00:00:00.000Z').toDate())
    fx.minStay.as(() => 1)
    fx.maxStay.as(() => null)
    fx.minAdvanceDays.as(() => 1)
    fx.maxAdvanceDays.as(() => null)
    fx.validForAbandoned.as(() => false)
    fx.validWeekDays.as(() => [0, 1, 2, 3, 4, 5, 6])
    fx.companyId.as(() => faker.string.uuid())
    fx.createdAt.as(() => faker.date.past())
    fx.updatedAt.as(() => faker.date.recent())

    fx.priceAdjustmentType.pickFrom(Object.values(PriceVariationType))
    fx.priceAdjustmentValue.as(() => faker.number.int({ min: 1, max: 100 }))
    fx.showInHighlights.as(() => true)
    fx.showDiscountTag.as(() => true)
    fx.isExclusive.as(() => false)
    fx.couponCode.as(() => '')
})

export const availableHousingUnitTypesFixture =
    defineFixture<OfferHousingUnitType>((fx) => {
        fx.id.as(() => faker.string.uuid())
        fx.offerId.as(() => faker.string.uuid())
        fx.housingUnitTypeId.as(() => faker.string.uuid())
    })

export const offerFullFixture = defineFixture<
    Prisma.OfferGetPayload<{ include: { validHousingUnitTypes: true } }>
>((fx) => {
    fx.extends(offerFixture)

    fx.validHousingUnitTypes.arrayOfFixture({
        fixture: availableHousingUnitTypesFixture,
    })
})
