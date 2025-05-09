import 'jest'

import { Test, TestingModule } from '@nestjs/testing'
import { mockDeep, mockReset } from 'jest-mock-extended'

import { ageGroupFixture } from '@/__fixtures__/ageGroup'
import { hostingRulesFixture } from '@/__fixtures__/HostingRules'
import { housingUnitTypeFullFixture } from '@/__fixtures__/HousingUnitType'
import {
    availableHousingUnitTypesFixture,
    offerFullFixture,
} from '@/__fixtures__/offer'
import { DateRangeDTO } from '@/common/dto/DateRange.dto'
import { PipeFns } from '@/common/utils/PipeFns'
import { PrismaService } from '../prisma/prisma.service'

import { AvailAndPricingService } from './availAndPricing.service'
import { PricingHelpers } from './helpers/PricingHelpers'
import { AgeGroupRule } from './rules/AgeGroupRule'
import { HostingRulesRule } from './rules/HostingRulesRule'
import { OfferRule } from './rules/OfferRule'
import { AvailAndPricingRules } from './rules/PricingRules'
import { RateOptionRule } from './rules/RateOptionRule'
import { ReservationRule } from './rules/ReservationRule'
import { SeasonRulesRule } from './rules/SeasonRulesRule'
import { ServiceRule } from './rules/ServiceRule'
import { SpecialDatesRule } from './rules/SpecialDatesRule'
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
                AgeGroupRule,
                OfferRule,
                ServiceRule,
                RateOptionRule,
                PipeFns,
                { provide: PrismaService, useValue: prismaMock },
            ],
        }).compile()

        service = module.get<AvailAndPricingService>(AvailAndPricingService)
    })

    const companyId = 'cc1c3c5c7-c9cb-4cdd-8e15-c3c5c7c9cbcd'

    const housingUnitType = housingUnitTypeFullFixture.create({
        weekendPrice: 1770,
        weekdaysPrice: 1770,
        chargeExtraAdultHigherThan: 2,
    })

    const hostingRules = hostingRulesFixture.create()

    const offer = offerFullFixture.create({
        priceAdjustmentType: 'PERCENTAGE_REDUCTION',
        priceAdjustmentValue: 10,
        validHousingUnitTypes: availableHousingUnitTypesFixture.createArrayWith(
            1,
            {
                housingUnitTypeId: housingUnitType.id,
            },
        ),
    })

    const ageGroupId = '24985a5d-3583-4353-bf68-7e59c68afc92'
    const ageGroups = [
        ageGroupFixture.create({
            id: ageGroupId,
            value: 150,
            chargeType: 'DAILY_PER_CHILDREN',
        }),
    ]

    it('Test case 1', async () => {
        const dateRange: DateRangeDTO = {
            start: '2025-05-19',
            end: '2025-05-21',
        }
        const currentDate = '2025-05-03'

        prismaMock.housingUnitType.findMany.mockResolvedValue([housingUnitType])

        prismaMock.hostingRules.findUnique.mockResolvedValue(hostingRules)

        const offers = [offer]

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
                    totalStay: 2,
                    basePrice: 3540,
                    finalPrice: 3186,
                    hostingRules,
                    seasonRules: [],
                    specialDates: [],
                    offers,
                    reservations: [],
                    services: [],
                    availability: [],
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

        prismaMock.housingUnitType.findMany.mockResolvedValue([housingUnitType])

        prismaMock.hostingRules.findUnique.mockResolvedValue(hostingRules)

        prismaMock.offer.findMany.mockResolvedValue([])
        prismaMock.ageGroup.findMany.mockResolvedValue(ageGroups)
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
                    hostingRules,
                    seasonRules: [],
                    specialDates: [],
                    offers: [],
                    reservations: [],
                    availability: [],
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

        prismaMock.housingUnitType.findMany.mockResolvedValue([housingUnitType])

        prismaMock.hostingRules.findUnique.mockResolvedValue(hostingRules)

        prismaMock.offer.findMany.mockResolvedValue([])
        prismaMock.ageGroup.findMany.mockResolvedValue(ageGroups)
        prismaMock.seasonRules.findMany.mockResolvedValue([])
        prismaMock.reservation.findMany.mockResolvedValue([])
        prismaMock.specialDate.findMany.mockResolvedValue([])

        const result = await service.getTotalPrices(companyId, currentDate, {
            dateRange,
            adults: 2,
            ageGroups: [
                {
                    ageGroupId,
                    quantity: 1,
                },
            ],
        })

        const expectedResult = [
            {
                ...housingUnitType,
                summary: {
                    basePrice: 3540,
                    finalPrice: 3840,
                    hostingRules,
                    seasonRules: [],
                    specialDates: [],
                    offers: [],
                    reservations: [],
                    services: [],
                    availability: [],
                },
            },
        ]

        expect(result).toMatchObject(expectedResult)
    })
})
