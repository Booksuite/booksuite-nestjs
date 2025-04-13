import 'jest'

import { Test, TestingModule } from '@nestjs/testing'
import { mockDeep, mockReset } from 'jest-mock-extended'

import { PipeFns } from '@/common/utils/PipeFns'
import { PrismaService } from '../prisma/prisma.service'

import { AvailAndPricingService } from './availAndPricing.service'
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
    HouseUnitTypeAvailAndPricingPayload,
} from './types'

describe('PricingService Helper Methods', () => {
    let service: AvailAndPricingService
    const prismaMock = mockDeep<PrismaService>()

    beforeEach(async () => {
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

    describe('getHousingUnitTypeCalendar', () => {
        it('should create a calendar for a housing unit type', () => {
            const housingUnitType: AvailAndPricingHousingUnitType = {
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
            }

            const hostingRules: AvailAndPricingHostingRules = {
                checkIn: 14 * 60,
                checkOut: 11 * 60,
                minDaily: 2,
                availableWeekDays: [0, 1, 2, 3, 4, 5, 6],
                availableWeekend: [0, 6],
                fixedWindowPeriod: 7,
                reservationWindowStart: null,
                reservationWindowEnd: null,
            }

            const payload: HouseUnitTypeAvailAndPricingPayload = {
                dateRange: {
                    start: '2025-01-01',
                    end: '2025-01-02',
                },
                housingUnitType,
                hostingRules,
                seasonRules: [],
                specialDates: [],
                offers: [],
                totalDays: 2,
                reservations: [],
            }

            const result = service.getHousingUnitTypeCalendar(payload)

            expect(result).toEqual({
                ...housingUnitType,
                calendar: expect.any(Object),
                housingUnits: housingUnitType.housingUnits,
            })
        })
    })

    describe('getInitialCalendarDay', () => {
        it('should return initial calendar day with weekend price', () => {
            const payload: HouseUnitTypeAvailAndPricingPayload = {
                dateRange: {
                    start: '2025-01-05', // Sunday
                    end: '2025-01-05',
                },
                housingUnitType: {
                    id: 'unit-type-1',
                    name: 'Unit Type 1',
                    weekdaysPrice: 200,
                    weekendPrice: 150,
                    housingUnits: [],
                },
                hostingRules: {
                    checkIn: 14 * 60,
                    checkOut: 11 * 60,
                    minDaily: 2,
                    availableWeekDays: [0, 1, 2, 3, 4, 5, 6],
                    availableWeekend: [0, 6],
                    fixedWindowPeriod: 7,
                    reservationWindowStart: null,
                    reservationWindowEnd: null,
                },
                totalDays: 2,
                reservations: [],
                seasonRules: [],
                specialDates: [],
                offers: [],
            }

            const result = service.getInitialCalendarDay(payload)

            expect(result).toEqual({
                basePrice: 150, // weekend price
                finalPrice: 150,
                finalMinDays: 2,
                hostingRules: payload.hostingRules,
                seasonRules: null,
                specialDates: null,
                offers: null,
                reservations: [],
                availability: {
                    available: true,
                    unavailabilitySource: null,
                    unavailableReason: null,
                    unavailableReasonMessage: null,
                },
            })
        })

        it('should return initial calendar day with weekday price', () => {
            const payload: HouseUnitTypeAvailAndPricingPayload = {
                dateRange: {
                    start: '2025-01-01', // Wednesday
                    end: '2025-01-01',
                },
                housingUnitType: {
                    id: 'unit-type-1',
                    name: 'Unit Type 1',
                    weekdaysPrice: 200,
                    weekendPrice: 150,
                    housingUnits: [],
                },
                hostingRules: {
                    checkIn: 14 * 60,
                    checkOut: 11 * 60,
                    minDaily: 2,
                    availableWeekDays: [0, 1, 2, 3, 4, 5, 6],
                    availableWeekend: [0, 6],
                    fixedWindowPeriod: 7,
                    reservationWindowStart: null,
                    reservationWindowEnd: null,
                },
                totalDays: 2,
                reservations: [],
                seasonRules: [],
                specialDates: [],
                offers: [],
            }

            const result = service.getInitialCalendarDay(payload)

            expect(result).toEqual({
                basePrice: 200, // weekday price
                finalPrice: 200,
                finalMinDays: 2,
                hostingRules: payload.hostingRules,
                seasonRules: null,
                specialDates: null,
                offers: null,
                reservations: [],
                availability: {
                    available: true,
                    unavailabilitySource: null,
                    unavailableReason: null,
                    unavailableReasonMessage: null,
                },
            })
        })
    })
})
