import 'jest'

import { Test, TestingModule } from '@nestjs/testing'
import { AgeGroup, HousingUnitType, Offer } from '@prisma/client'
import dayjs from 'dayjs'
import { mockDeep, mockReset } from 'jest-mock-extended'

import { DateRangeDTO } from '@/common/dto/DateRange.dto'
import { PipeFns } from '@/common/utils/PipeFns'
import { PrismaService } from '../prisma/prisma.service'

import { AvailAndPricingService } from './availAndPricing.service'
import { UNAVAILABLE_REASON_MESSAGE } from './constants'
import { UnavailabilityReason } from './enum/UnavailableReason.enum'
import { UnavailableSource } from './enum/UnavailableReason.enum'
import { PricingHelpers } from './helpers/PricingHelpers'
import { HostingRulesRule } from './rules/HostingRulesRule'
import { OfferRule } from './rules/OfferPricing'
import { AvailAndPricingRules } from './rules/PricingRules'
import { ReservationRule } from './rules/ReservationRule'
import { SeasonRulesRule } from './rules/SeasonRulesRule'
import { SpecialDatesRule } from './rules/SpecialDatesRule'
import { AvailAndPricingHousingUnitType } from './types'
describe('getTotalPrice', () => {
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

    const housingUnitType: AvailAndPricingHousingUnitType = {
        id: '052d2d58-0762-48ff-a947-1b8998a7b19c',
        name: 'Chalé Imperial',
        slug: 'chale-imperial',
        shortDescription: '',
        description:
            'Luxuoso e exclusivo, possui piscina climatizada com vista para a lagoa. A suíte imperial conta com banheira de hidro, cozinha completa, lareira na sala, churrasqueira, sala de jogos e fogo de chão.',
        order: 0,
        published: true,
        minGuests: 2,
        maxGuests: 2,
        maxAdults: 2,
        maxChildren: 1,
        weekdaysPrice: 1770,
        weekendPrice: 1770,
        extraAdultPrice: 150,
        chargeExtraAdultHigherThan: 2,
        companyId: 'c1c3c5c7-c9cb-4cdd-8e15-c3c5c7c9cbcd',
        createdAt: '2025-04-29T14:39:11.484Z',
        updatedAt: '2025-05-02T15:06:34.255Z',
        deletedAt: null,
        housingUnits: [
            {
                id: '4877ec63-ba87-469f-9438-8d5aacbb8d58',
                name: 'Chalé Imperial 1',
                order: 0,
                housingUnitTypeId: '052d2d58-0762-48ff-a947-1b8998a7b19c',
                createdAt: '2025-04-29T14:39:11.484Z',
                updatedAt: '2025-05-02T15:06:34.255Z',
            },
        ],
    } as unknown as AvailAndPricingHousingUnitType

    const hostingRules = {
        id: 'bbe836ba-430c-45c6-a052-889a603e1225',
        checkIn: 840,
        checkOut: 720,
        minDaily: 2,
        fixedWindowPeriod: 365,
        reservationWindowStart: null,
        reservationWindowEnd: null,
        availableWeekend: [5, 6],
        availableWeekDays: [0, 1, 2, 3, 4, 5, 6],
        companyId: 'c1c3c5c7-c9cb-4cdd-8e15-c3c5c7c9cbcd',
    }

    const offer = {
        id: 'd6ebb3ca-6fbc-43e7-81be-aaa2fd48b482',
        name: 'Mês das Noivas - Diárias',
        description:
            'Reserve com 10% de desconto em diárias dia de semana no mês de Maio de 2025, Mês das Noivas no Chalé Lagoa da Serra.',
        published: true,
        purchaseStartDate: dayjs.utc('2025-05-01T00:00:00.000Z').toDate(),
        purchaseEndDate: dayjs.utc('2025-05-31T00:00:00.000Z').toDate(),
        validStartDate: dayjs.utc('2025-05-01T00:00:00.000Z').toDate(),
        validEndDate: dayjs.utc('2025-05-31T00:00:00.000Z').toDate(),
        minDays: 1,
        maxDays: 1,
        minAdvanceDays: 1,
        maxAdvanceDays: 170,
        validForAbandoned: false,
        validForPackages: false,
        availableWeekDays: [0, 1, 2, 3, 4],
        priceAdjustmentType: 'PERCENTAGE_REDUCTION',
        priceAdjustmentValue: 10,
        showInHighlights: true,
        showDiscountTag: true,
        isExclusive: false,
        couponCode: '',
        companyId: 'c1c3c5c7-c9cb-4cdd-8e15-c3c5c7c9cbcd',
        createdAt: dayjs.utc('2025-05-02T20:55:58.066Z').toDate(),
        updatedAt: dayjs.utc('2025-05-03T12:45:57.429Z').toDate(),
        availableHousingUnitTypes: [
            {
                id: 'be8d34f1-5736-45da-97f1-3b8785c3ccd6',
                offerId: 'd6ebb3ca-6fbc-43e7-81be-aaa2fd48b482',
                housingUnitTypeId: 'cd6bd9b3-b5c2-4f2b-b48d-9f8326c05ed3',
            },
            {
                id: '21e32951-5436-466d-8c8d-b1cd98030896',
                offerId: 'd6ebb3ca-6fbc-43e7-81be-aaa2fd48b482',
                housingUnitTypeId: '74e1fd64-24d1-4b22-8d17-f4188865d59d',
            },
            {
                id: 'f0b890f5-19a4-4c3c-93b1-3190c57e17ab',
                offerId: 'd6ebb3ca-6fbc-43e7-81be-aaa2fd48b482',
                housingUnitTypeId: '052d2d58-0762-48ff-a947-1b8998a7b19c',
            },
        ],
    }

    const ageGroups = [
        {
            id: '24985a5d-3583-4353-bf68-7e59c68afc92',
            name: 'Adulto',
            initialAge: 3,
            finalAge: 13,
            chargeType: '"DAILY_PER_CHILDREN"',
            value: 150,
        },
    ]

    it('Test case 1', async () => {
        const dateRange: DateRangeDTO = {
            start: '2025-05-19',
            end: '2025-05-21',
        }
        const currentDate = '2025-05-03'
        const companyId = 'company-1'

        prismaMock.housingUnitType.findMany.mockResolvedValue([
            housingUnitType as unknown as HousingUnitType,
        ])

        prismaMock.hostingRules.findUnique.mockResolvedValue(hostingRules)

        const offers = [offer as unknown as Offer]

        prismaMock.offer.findMany.mockResolvedValue(offers)
        prismaMock.seasonRules.findMany.mockResolvedValue([])
        prismaMock.reservation.findMany.mockResolvedValue([])
        prismaMock.specialDate.findMany.mockResolvedValue([])

        const result = await service.getTotalPrices(companyId, currentDate, {
            dateRange,
            adults: 2,
        })

        const expectedResult = [
            {
                ...housingUnitType,
                summary: {
                    basePrice: 3540,
                    finalPrice: 3540,
                    hostingRules: [
                        {
                            id: 'bbe836ba-430c-45c6-a052-889a603e1225',
                            checkIn: 840,
                            checkOut: 720,
                            minDaily: 2,
                            fixedWindowPeriod: 365,
                            reservationWindowStart: null,
                            reservationWindowEnd: null,
                            availableWeekend: [5, 6],
                            availableWeekDays: [0, 1, 2, 3, 4, 5, 6],
                            companyId: 'c1c3c5c7-c9cb-4cdd-8e15-c3c5c7c9cbcd',
                        },
                    ],
                    seasonRules: [],
                    specialDates: [],
                    offers: offers,
                    reservations: [],
                    availability: [
                        {
                            available: true,
                            unavailabilitySource: null,
                            unavailableReason: null,
                            unavailableReasonMessage: null,
                        },
                    ],
                },
            },
        ]

        expect(result).toMatchObject(expectedResult)
    })

    it('Test case 2', async () => {
        const dateRange: DateRangeDTO = {
            start: '2025-05-19',
            end: '2025-05-21',
        }
        const currentDate = '2025-05-03'
        const companyId = 'company-1'

        prismaMock.housingUnitType.findMany.mockResolvedValue([
            housingUnitType as unknown as HousingUnitType,
        ])

        prismaMock.hostingRules.findUnique.mockResolvedValue(hostingRules)

        const offers = [offer as unknown as Offer]

        prismaMock.offer.findMany.mockResolvedValue(offers)
        prismaMock.ageGroup.findMany.mockResolvedValue([
            ageGroups as unknown as AgeGroup,
        ])
        prismaMock.seasonRules.findMany.mockResolvedValue([])
        prismaMock.reservation.findMany.mockResolvedValue([])
        prismaMock.specialDate.findMany.mockResolvedValue([])

        const result = await service.getTotalPrices(companyId, currentDate, {
            dateRange,
            adults: 2,
            ageGroups: [
                {
                    ageGroupId: '24985a5d-3583-4353-bf68-7e59c68afc92',
                    quantity: 1,
                },
            ],
        })

        const expectedResult = [
            {
                ...housingUnitType,
                summary: {
                    basePrice: 400,
                    finalPrice: 400,
                    hostingRules: [
                        {
                            id: 'bbe836ba-430c-45c6-a052-889a603e1225',
                            checkIn: 840,
                            checkOut: 720,
                            minDaily: 2,
                            fixedWindowPeriod: 365,
                            reservationWindowStart: null,
                            reservationWindowEnd: null,
                            availableWeekend: [5, 6],
                            availableWeekDays: [0, 1, 2, 3, 4, 5, 6],
                            companyId: 'c1c3c5c7-c9cb-4cdd-8e15-c3c5c7c9cbcd',
                        },
                    ],
                    seasonRules: [],
                    specialDates: [],
                    offers: offers,
                    reservations: [],
                    availability: [
                        {
                            available: false,
                            unavailabilitySource:
                                UnavailableSource.HOSTING_RULES,
                            unavailableReason:
                                UnavailabilityReason.MAX_GUESTS_EXCEEDED,
                            unavailableReasonMessage:
                                UNAVAILABLE_REASON_MESSAGE[
                                    UnavailabilityReason.MAX_GUESTS_EXCEEDED
                                ],
                        },
                    ],
                },
            },
        ]

        expect(result).toMatchObject(expectedResult)
    })

    it('Test case 3', async () => {
        const dateRange: DateRangeDTO = {
            start: '2025-05-24',
            end: '2025-05-26',
        }
        const currentDate = '2025-05-03'
        const companyId = 'company-1'

        prismaMock.housingUnitType.findMany.mockResolvedValue([
            housingUnitType as unknown as HousingUnitType,
        ])

        prismaMock.hostingRules.findUnique.mockResolvedValue(hostingRules)

        const offers = [offer as unknown as Offer]

        prismaMock.offer.findMany.mockResolvedValue(offers)
        prismaMock.ageGroup.findMany.mockResolvedValue([
            ageGroups as unknown as AgeGroup,
        ])
        prismaMock.seasonRules.findMany.mockResolvedValue([])
        prismaMock.reservation.findMany.mockResolvedValue([])
        prismaMock.specialDate.findMany.mockResolvedValue([])

        const result = await service.getTotalPrices(companyId, currentDate, {
            dateRange,
            adults: 2,
            ageGroups: [
                {
                    ageGroupId: '24985a5d-3583-4353-bf68-7e59c68afc92',
                    quantity: 1,
                },
            ],
        })

        const expectedResult = [
            {
                ...housingUnitType,
                summary: {
                    basePrice: 400,
                    finalPrice: 400,
                    hostingRules: [
                        {
                            id: 'bbe836ba-430c-45c6-a052-889a603e1225',
                            checkIn: 840,
                            checkOut: 720,
                            minDaily: 2,
                            fixedWindowPeriod: 365,
                            reservationWindowStart: null,
                            reservationWindowEnd: null,
                            availableWeekend: [5, 6],
                            availableWeekDays: [0, 1, 2, 3, 4, 5, 6],
                            companyId: 'c1c3c5c7-c9cb-4cdd-8e15-c3c5c7c9cbcd',
                        },
                    ],
                    seasonRules: [],
                    specialDates: [],
                    offers: offers,
                    reservations: [],
                    availability: [
                        {
                            available: false,
                            unavailabilitySource:
                                UnavailableSource.HOSTING_RULES,
                            unavailableReason:
                                UnavailabilityReason.MAX_GUESTS_EXCEEDED,
                            unavailableReasonMessage:
                                UNAVAILABLE_REASON_MESSAGE[
                                    UnavailabilityReason.MAX_GUESTS_EXCEEDED
                                ],
                        },
                    ],
                },
            },
        ]

        expect(result).toMatchObject(expectedResult)
    })
})
