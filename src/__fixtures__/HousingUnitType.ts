import { faker } from '@faker-js/faker'
import { HousingUnitType, Prisma } from '@prisma/client'
import { defineFixture } from 'efate'

import { facilityFixture } from './Facility'
import { housingUnitFixture } from './HousingUnit'
import { mediaFixture } from './Media'

export const housingUnitTypeFixture = defineFixture<HousingUnitType>((fx) => {
    fx.id.as(() => faker.string.uuid())
    fx.name.as(() => faker.company.name())
    fx.slug.as(() => faker.string.sample(10))
    fx.shortDescription.as(() => faker.lorem.sentence())
    fx.description.as(() => faker.lorem.paragraph())

    fx.published.as(() => true)
    fx.order.as(() => faker.number.int({ min: 0, max: 100 }))
    fx.minGuests.as(() => 1)
    fx.maxGuests.as(() => 3)
    fx.maxAdults.as(() => 2)
    fx.maxChildren.as(() => 1)
    fx.weekdaysPrice.as(() => 100)
    fx.weekendPrice.as(() => 150)
    fx.extraAdultPrice.as(() => 0)
    fx.chargeExtraAdultHigherThan.as(() => 2)

    fx.createdAt.as(() => faker.date.past())
    fx.updatedAt.as(() => faker.date.recent())
    fx.deletedAt.as(() => null)
})

export const housingUnitTypeFullFixture = defineFixture<
    Prisma.HousingUnitTypeGetPayload<{
        include: { housingUnits: true; facilities: true; medias: true }
    }>
>((fx) => {
    fx.extends(housingUnitTypeFixture)
    fx.housingUnits.arrayOfFixture({ fixture: housingUnitFixture })
    fx.facilities.arrayOfFixture({ fixture: facilityFixture })
    fx.medias.arrayOfFixture({ fixture: mediaFixture })
})
