import { faker } from '@faker-js/faker/.'
import { Facility } from '@prisma/client'
import { defineFixture } from 'efate'

export const facilityFixture = defineFixture<Facility>((fx) => {
    fx.id.as(() => faker.string.uuid())
    fx.name.as(() => faker.company.name())
    fx.icon.as(() => faker.image.avatar())
    fx.createdAt.as(() => faker.date.past())
    fx.updatedAt.as(() => faker.date.recent())
})
