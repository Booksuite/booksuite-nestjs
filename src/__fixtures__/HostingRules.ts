import { faker } from '@faker-js/faker/.'
import { HostingRules } from '@prisma/client'
import { defineFixture } from 'efate'

export const hostingRulesFixture = defineFixture<HostingRules>((fx) => {
    fx.id.as(() => faker.string.uuid())
    fx.checkIn.as(() => 840)
    fx.checkOut.as(() => 720)
    fx.minDaily.as(() => 2)
    fx.fixedWindowPeriod.as(() => 365)
    fx.reservationWindowStart.as(() => null)
    fx.reservationWindowEnd.as(() => null)
    fx.availableWeekend.as(() => [5, 6])
    fx.availableWeekDays.as(() => [0, 1, 2, 3, 4, 5, 6])
    fx.companyId.as(() => faker.string.uuid())
})
