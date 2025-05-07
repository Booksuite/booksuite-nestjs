import { faker } from '@faker-js/faker/.'
import { HousingUnit } from '@prisma/client'
import { defineFixture } from 'efate'

export const housingUnitFixture = defineFixture<HousingUnit>((fx) => {
    fx.id.as(() => faker.string.uuid())
    fx.name.as(() => faker.company.name())
    fx.order.as(() => faker.number.int({ min: 0, max: 100 }))
    fx.housingUnitTypeId.as(() => faker.string.uuid())

    fx.createdAt.as(() => faker.date.past())
    fx.updatedAt.as(() => faker.date.recent())
})
