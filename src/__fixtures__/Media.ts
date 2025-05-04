import { faker } from '@faker-js/faker/.'
import { Media } from '@prisma/client'
import { defineFixture } from 'efate'

export const mediaFixture = defineFixture<Media>((fx) => {
    fx.id.as(() => faker.string.uuid())
    fx.url.as(() => faker.image.url())
    fx.metadata.as(() => ({
        mimetype: faker.system.mimeType(),
    }))
    fx.createdAt.as(() => faker.date.past())
    fx.updatedAt.as(() => faker.date.recent())
})
