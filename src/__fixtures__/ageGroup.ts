import { faker } from '@faker-js/faker/.'
import { AgeGroup } from '@prisma/client'
import { defineFixture } from 'efate'

export const ageGroupFixture = defineFixture<AgeGroup>((fx) => {
    fx.id.as(() => faker.string.uuid())

    fx.initialAge.as(() => faker.number.int({ min: 1, max: 100 }))
    fx.finalAge.as(() => faker.number.int({ min: 1, max: 100 }))
    fx.chargeType.as(() => faker.lorem.word())
    fx.value.as(() => faker.number.float({ min: 1, max: 100 }))
})
