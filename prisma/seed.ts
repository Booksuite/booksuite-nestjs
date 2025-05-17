/* eslint-disable no-console */

import '../src/common/utils/dayjs'

import { PrismaClient } from '@prisma/client'
import * as fs from 'fs'
import * as path from 'path'

const client = new PrismaClient()

async function seedDatabase() {
    try {
        const dumpDir = path.join(__dirname, 'dumps')

        // Check if dump directory exists
        if (!fs.existsSync(dumpDir))
            throw new Error(
                'Dump directory not found. Please run dump-db.ts first.',
            )

        const models = [
            'role',
            'user',
            'company',
            'media',
            'banner',
            'facility',
            'bannerMedia',
            'hostingRules',
            'companyFacility',
            'housingUnitType',
            'housingUnit',
            'housingUnitTypeMedia',
            'housingUnitTypeFacility',
            'service',
            'serviceHousingUnitType',
            'serviceMedia',
            'specialDate',
            'specialDateHousingUnitType',
            'specialDateMedias',
            'offer',
            'offerHousingUnitType',
            'offerPaymentMethod',
            'offerService',
            'paymentMethod',
            'cancellationPolicy',
            'penaltyRange',
            'agePolicy',
            'ageGroup',
            'rateOption',
            'rateOptionAgeGroup',
            'rateOptionHousingUnitTypes',
            'reservation',
            'reservationService',
            'reservationConfig',
            'reservationAgeGroup',
            'seasonRules',
            'seasonRuleHousingUnitType',
            'userCompanyRelation',
            'utilityLinks',
        ]

        await client.$transaction((tx) => {
            const promises = models.map(async (model) => {
                const filePath = path.join(dumpDir, `${model}.json`)

                if (!fs.existsSync(filePath)) {
                    console.log(`${model} - File ${filePath} not found.`)

                    return
                }

                const data = JSON.parse(fs.readFileSync(filePath, 'utf-8'))

                if (!data.length) return

                await tx[model].createMany({
                    data: data,
                })

                console.log(`${model} - Seeded ${data.length} records`)
            })
            return Promise.all(promises)
        })

        console.log('Database seeding completed successfully!')
    } catch (error) {
        console.error('Error during database seeding:', error)
        process.exit(1)
    }
}

void seedDatabase()
