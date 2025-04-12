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

import { PricingHelpers } from './helpers/PricingHelpers'
import { PricingService } from './pricing.service'
import { HostingRulesPricing } from './rules/HostingRulesPricing'
import { OfferPricing } from './rules/OfferPricing'
import { PricingRules } from './rules/PricingRules'
import { ReservationRule } from './rules/ReservationRule'
import { SeasonRulesPricing } from './rules/SeasonRulesPricing'
import { SpecialDatesPricing } from './rules/SpecialDatesPricing'
import {
    CalendarHousingUnitType,
    CalendarOffers,
    CalendarPayload,
    CalendarSeasonRules,
    CalendarSpecialDates,
    HouseUnitTypePricingPayload,
} from './types'

describe('PricingService Payload Methods', () => {
    let service: PricingService
    const prismaMock = mockDeep<PrismaService>()

    beforeEach(async () => {
        mockReset(prismaMock)

        const module: TestingModule = await Test.createTestingModule({
            providers: [
                PricingHelpers,
                PricingService,
                PricingRules,
                SeasonRulesPricing,
                ReservationRule,
                HostingRulesPricing,
                SpecialDatesPricing,
                OfferPricing,
                PipeFns,
                { provide: PrismaService, useValue: prismaMock },
            ],
        }).compile()

        service = module.get<PricingService>(PricingService)
    })

    describe('getCalendarPayload', () => {
        it('should throw error when hosting rules not found', async () => {
            const dateRange: DateRangeDTO = {
                start: '2025-01-01',
                end: '2025-01-02',
            }
            const currentDate = '2024-12-01'
            const companyId = 'company-1'

            prismaMock.hostingRules.findUnique.mockResolvedValue(null)

            await expect(
                service.getCalendarPayload(companyId, currentDate, dateRange),
            ).rejects.toThrow('Hosting rule not found')
        })

        it('should return calendar payload with all required data', async () => {
            const dateRange: DateRangeDTO = {
                start: '2025-01-01',
                end: '2025-01-02',
            }
            const currentDate = '2024-12-01'
            const companyId = 'company-1'

            const hostingRules: HostingRules = {
                id: 'rules-1',
                companyId,
                checkIn: 14 * 60,
                checkOut: 11 * 60,
                minDaily: 2,
                availableWeekDays: [0, 1, 2, 3, 4, 5, 6],
                availableWeekend: [0, 6],
                fixedWindowPeriod: 7,
                reservationWindowStart: null,
                reservationWindowEnd: null,
            }

            const housingUnitTypes: CalendarHousingUnitType[] = [
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

            const seasonRules: CalendarSeasonRules[] = [
                {
                    id: 'season-1',
                    companyId,
                    name: 'Season Rule 1',
                    startDate: new Date('2025-01-01'),
                    endDate: new Date('2025-01-01'),
                    minDaily: 1,
                    priceVariationType: PriceVariationType.ABSOLUTE_REDUCTION,
                    price: 10,
                    published: true,
                    visibilityStart: null,
                    visibilityEnd: null,
                    availableWeekDays: [0, 1, 2, 3, 4, 5, 6],
                    housingUnitTypePrices: [
                        { housingUnitTypeId: housingUnitTypes[0].id },
                    ],
                },
            ]

            prismaMock.hostingRules.findUnique.mockResolvedValue(hostingRules)
            prismaMock.housingUnitType.findMany.mockResolvedValue(
                housingUnitTypes as unknown as HousingUnitType[],
            )
            prismaMock.seasonRules.findMany.mockResolvedValue(seasonRules)
            prismaMock.specialDate.findMany.mockResolvedValue([])
            prismaMock.offer.findMany.mockResolvedValue([])

            const result = await service.getCalendarPayload(
                companyId,
                currentDate,
                dateRange,
            )

            expect(result).toEqual({
                dateRange,
                housingUnitTypes,
                hostingRules,
                seasonRules,
                specialDates: [],
                offers: [],
            })
        })
    })

    describe('getHousingUnitTypePayload', () => {
        it('should filter rules and dates for specific housing unit type', () => {
            const housingUnitType: CalendarHousingUnitType = {
                id: 'unit-type-1',
                name: 'Unit Type 1',
                weekdaysPrice: 200,
                weekendPrice: 150,
                housingUnits: [],
            }

            const seasonRules: CalendarSeasonRules[] = [
                {
                    id: 'season-1',
                    companyId: 'company-1',
                    name: 'Season Rule 1',
                    startDate: new Date('2025-01-01'),
                    endDate: new Date('2025-01-01'),
                    minDaily: 1,
                    priceVariationType: PriceVariationType.ABSOLUTE_REDUCTION,
                    price: 10,
                    published: true,
                    visibilityStart: null,
                    visibilityEnd: null,
                    availableWeekDays: [0, 1, 2, 3, 4, 5, 6],
                    housingUnitTypePrices: [
                        { housingUnitTypeId: 'unit-type-1' },
                        { housingUnitTypeId: 'unit-type-2' },
                    ],
                },
                {
                    id: 'season-2',
                    companyId: 'company-1',
                    name: 'Season Rule 2',
                    startDate: new Date('2025-01-01'),
                    endDate: new Date('2025-01-01'),
                    minDaily: 1,
                    priceVariationType: PriceVariationType.ABSOLUTE_REDUCTION,
                    price: 10,
                    published: true,
                    visibilityStart: null,
                    visibilityEnd: null,
                    availableWeekDays: [0, 1, 2, 3, 4, 5, 6],
                    housingUnitTypePrices: [
                        { housingUnitTypeId: 'unit-type-2' },
                    ],
                },
            ]

            const specialDates: CalendarSpecialDates[] = [
                {
                    id: 'special-1',
                    companyId: 'company-1',
                    name: 'Special Date 1',
                    startDate: new Date('2025-01-01'),
                    endDate: new Date('2025-01-01'),
                    minDaily: 1,
                    priceVariationType: PriceVariationType.ABSOLUTE_REDUCTION,
                    price: 10,
                    published: true,
                    availableWeekDays: [0, 1, 2, 3, 4, 5, 6],
                    description: null,
                    generalDescription: null,
                    housingUnitTypePrices: [
                        { housingUnitTypeId: 'unit-type-1' },
                    ],
                },
            ]

            const offers: CalendarOffers[] = [
                {
                    id: 'offer-1',
                    companyId: 'company-1',
                    name: 'Offer 1',
                    published: true,
                    availableWeekDays: [0, 1, 2, 3, 4, 5, 6],
                    createdAt: new Date(),
                    updatedAt: new Date(),
                    purchaseStartDate: new Date(),
                    purchaseEndDate: new Date(),
                    validStartDate: null,
                    validEndDate: null,
                    minDays: null,
                    maxDays: null,
                    minAdvanceDays: null,
                    maxAdvanceDays: null,
                    validForAbandoned: false,
                    validForPackages: false,
                    priceAdjustmentType: PriceVariationType.ABSOLUTE_REDUCTION,
                    priceAdjustmentValue: 10,
                    showInHighlights: false,
                    showDiscountTag: false,
                    isExclusive: false,
                    couponCode: null,
                    description: null,
                    availableHousingUnitTypes: [
                        { housingUnitTypeId: 'unit-type-1' },
                    ],
                },
            ]

            const payload: CalendarPayload = {
                dateRange: {
                    start: '2025-01-01',
                    end: '2025-01-02',
                },
                housingUnitTypes: [housingUnitType],
                hostingRules: {
                    id: 'rules-1',
                    companyId: 'company-1',
                    checkIn: 14 * 60,
                    checkOut: 11 * 60,
                    minDaily: 2,
                    availableWeekDays: [0, 1, 2, 3, 4, 5, 6],
                    availableWeekend: [0, 6],
                    fixedWindowPeriod: 7,
                    reservationWindowStart: null,
                    reservationWindowEnd: null,
                },

                reservations: [],
                seasonRules,
                specialDates,
                offers,
            }

            const expectedPayload: HouseUnitTypePricingPayload = {
                dateRange: payload.dateRange,
                housingUnitType,
                hostingRules: payload.hostingRules,
                seasonRules: [seasonRules[0]], // Only first season rule applies
                specialDates,
                offers,
                totalDays: 1,
                reservations: [],
            }
            const result = service.filterHousingUnitTypePayload(
                housingUnitType,
                payload,
            )

            expect(result).toEqual(expectedPayload)
        })
    })
})
