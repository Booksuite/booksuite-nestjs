import 'jest'

import { Test, TestingModule } from '@nestjs/testing'
import {
    HostingRules,
    HousingUnitType,
    PriceVariationType,
} from '@prisma/client'
import { mockDeep, mockReset } from 'jest-mock-extended'

import { DateRangeDTO } from '@/common/dto/DateRange.dto'
import { PipeFns } from '@/common/utils/PipeFns'
import { PrismaService } from '../prisma/prisma.service'

import { AvailAndPricingService } from './availAndPricing.service'
import { UNAVAILABLE_REASON_MESSAGE } from './constants'
import {
    UnavailabilityReason,
    UnavailableSource,
} from './enum/UnavailableReason.enum'
import { PricingHelpers } from './helpers/PricingHelpers'
import { HostingRulesRule } from './rules/HostingRulesRule'
import { OfferRule } from './rules/OfferPricing'
import { AvailAndPricingRules } from './rules/PricingRules'
import { ReservationRule } from './rules/ReservationRule'
import { SeasonRulesRule } from './rules/SeasonRulesRule'
import { SpecialDatesRule } from './rules/SpecialDatesRule'
import {
    AvailAndPricingHostingRules,
    AvailAndPricingHousingUnitType,
    AvailAndPricingSeasonRules,
    HousingUnitTypeAvailability,
} from './types'

describe('PricingService', () => {
    let service: AvailAndPricingService
    const prismaMock = mockDeep<PrismaService>()

    beforeEach(async () => {
        // Create mock for PrismaService
        mockReset(prismaMock)

        const module: TestingModule = await Test.createTestingModule({
            providers: [
                PricingHelpers,
                AvailAndPricingService,
                AvailAndPricingRules,
                SeasonRulesRule,
                ReservationRule,
                HostingRulesRule,
                SpecialDatesRule,
                OfferRule,
                PipeFns,
                { provide: PrismaService, useValue: prismaMock },
            ],
        }).compile()

        service = module.get<AvailAndPricingService>(AvailAndPricingService)
    })

    describe('pipeDays', () => {
        it('should create a calendar with days between start and end date', async () => {
            const dateRange: DateRangeDTO = {
                start: '2025-01-01',
                end: '2025-01-02',
            }
            const currentDate = '2024-12-01'
            const companyId = 'company-1'

            const housingUnitTypes: AvailAndPricingHousingUnitType[] = [
                {
                    id: 'unit-type-1',
                    name: 'Unit Type 1',
                    weekdaysPrice: 200,
                    weekendPrice: 150,
                    housingUnits: [
                        {
                            id: 'unit-1',
                            name: 'Unit 1',
                            order: 1,
                            createdAt: new Date(),
                            updatedAt: new Date(),
                            housingUnitTypeId: 'unit-type-1',
                        },
                    ],
                },
            ]

            const hostingRulesMock: AvailAndPricingHostingRules = {
                checkIn: 14 * 60, // 2:00 PM
                checkOut: 11 * 60, // 11:00 AM
                minDaily: 2,
                availableWeekDays: [0, 1, 2, 3, 4, 5, 6],
                availableWeekend: [0, 6],
                fixedWindowPeriod: 7,
                reservationWindowStart: null,
                reservationWindowEnd: null,
            }

            const firstDaySeasonRule: AvailAndPricingSeasonRules = {
                availableWeekDays: [0, 1, 2, 3, 4, 5, 6],
                companyId: 'company-1',
                startDate: new Date('2025-01-01'),
                endDate: new Date('2025-01-01'),
                id: 'season-rule-1',
                minDaily: 1,
                name: 'Season Rule 1',
                priceVariationType: PriceVariationType.ABSOLUTE_REDUCTION,
                price: 10,
                published: true,
                visibilityEnd: null,
                visibilityStart: null,
                housingUnitTypePrices: [
                    { housingUnitTypeId: housingUnitTypes[0].id },
                ],
            }

            const responseCalendar: HousingUnitTypeAvailability[] = [
                {
                    ...housingUnitTypes[0],
                    calendar: {
                        '2025-01-01': {
                            basePrice: 190,
                            finalPrice: 190,
                            finalMinDays: 1,
                            hostingRules: hostingRulesMock,
                            seasonRules: firstDaySeasonRule,
                            specialDates: null,
                            offers: null,
                            reservations: [],
                            availability: {
                                available: true,
                                unavailabilitySource: null,
                                unavailableReason: null,
                                unavailableReasonMessage: null,
                            },
                        },
                        '2025-01-02': {
                            basePrice: 200,
                            finalPrice: 200,
                            finalMinDays: 2,
                            hostingRules: hostingRulesMock,
                            seasonRules: null,
                            specialDates: null,
                            offers: null,
                            reservations: [],
                            availability: {
                                available: false,
                                unavailabilitySource:
                                    UnavailableSource.HOSTING_RULES,
                                unavailableReason:
                                    UnavailabilityReason.MIN_DAYS_NOT_REACHED,
                                unavailableReasonMessage:
                                    UNAVAILABLE_REASON_MESSAGE[
                                        UnavailabilityReason
                                            .MIN_DAYS_NOT_REACHED
                                    ],
                            },
                        },
                    },
                },
            ]

            prismaMock.housingUnitType.findMany.mockResolvedValue(
                housingUnitTypes as unknown as HousingUnitType[],
            )
            prismaMock.hostingRules.findUnique.mockResolvedValue(
                hostingRulesMock as unknown as HostingRules,
            )

            prismaMock.seasonRules.findMany.mockResolvedValue([
                firstDaySeasonRule,
            ])
            prismaMock.reservation.findMany.mockResolvedValue([])
            prismaMock.specialDate.findMany.mockResolvedValue([])
            prismaMock.offer.findMany.mockResolvedValue([])

            const result = await service.getCalendar(
                companyId,
                currentDate,
                dateRange,
            )

            expect(result).toEqual(responseCalendar)
        })
    })
})
