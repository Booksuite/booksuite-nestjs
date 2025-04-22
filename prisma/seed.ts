/* eslint-disable no-console */

import { Facility, PrismaClient, ReservationStatus } from '@prisma/client'
import * as bcrypt from 'bcrypt'
import dayjs from 'dayjs'
import IsBetween from 'dayjs/plugin/isBetween'
import Utc from 'dayjs/plugin/utc'

import facilities from '../scripts/facilities.json'

dayjs.extend(IsBetween)
dayjs.extend(Utc)

const client = new PrismaClient()

const load = async () => {
    try {
        await setUserAndRoles()
    } catch (error) {
        console.error(error)
        process.exit(1)
    } finally {
        await client.$disconnect()
    }
}
void load()

//+++++++++++++++++++++++======FUNCTIONS SEED======+++++++++++++++++++++++++++++++

async function setUserAndRoles() {
    await client.$transaction(async (tx) => {
        await tx.role.createMany({
            skipDuplicates: true,
            data: [
                { name: 'Admin', slug: 'admin' },
                { name: 'Usuário', slug: 'user' },
            ],
        })

        console.log('Added default roles data')

        const user1 = await tx.user.create({
            data: {
                email: 'john.doe@gmail.com',
                firstName: 'John',
                lastName: 'Doe',
                phone: '489831034',
                password: 'securePassword123',
                metaData: { preferences: { notifications: true } },
            },
        })
        console.log('Added default user 1')

        const user2 = await tx.user.create({
            data: {
                email: 'jane.smith@gmail.com',
                firstName: 'Jane',
                lastName: 'Smith',
                phone: '479831024',
                password: 'anotherSecurePassword456',
                metaData: { preferences: { notifications: false } },
            },
        })
        console.log('Added default user 2')

        const dbRole = await tx.role.findUnique({
            where: {
                slug: 'admin',
            },
        })
        console.log('Added default role')
        //Company Data

        const companyId = 'c1c3c5c7-c9cb-4cdd-8e15-c3c5c7c9cbcd'

        const company = await tx.company.create({
            data: {
                id: companyId,
                name: 'BookSuite',
                address: 'Rua das Flores, 123',
                number: '123',
                city: 'São Paulo',
                zipcode: '1234567890',
                mapCoordinates: {
                    latitude: 123.456,
                    longitude: 78.91,
                },
                hostingRules: {
                    create: {
                        checkIn: 14,
                        checkOut: 12,
                        minDaily: 2,
                        fixedWindowPeriod: 120,
                        availableWeekend: [2],
                        reservationWindowStart: dayjs
                            .utc('2025-12-01')
                            .toISOString(),
                        reservationWindowEnd: dayjs
                            .utc('2025-12-31')
                            .toISOString(),
                        availableWeekDays: [0, 1, 3, 4],
                    },
                },
                state: 'SP',
                country: 'Brasil',
                logo: 'https://booksuite.com.br/logo.png',
                slug: 'booksuites',
                responsible: 'BookSuite',
                responsibleEmail: 'admin@booksuite.com.br',
                responsiblePhone: '1234567890',
                docType: 'CNPJ',
                identification: '1234567890',
                companyName: 'BookSuite',
                published: true,
            },
        })

        await tx.company.update({
            where: { id: companyId },
            data: {
                bannerImage: {
                    create: {
                        companyId: companyId,
                        metadata: { mimetype: 'image/jpg' },
                        url: 'https://fastly.picsum.photos/id/16/2500/1667.jpg?hmac=uAkZwYc5phCRNFTrV_prJ_0rP0EdwJaZ4ctje2bY7aE',
                    },
                },
            },
        })

        console.log('Added default company')
        //availableHousingUnitTypes And HousingUnits
        const suiteDiamante = await tx.housingUnitType.create({
            include: { housingUnits: true },
            data: {
                name: 'Suite Diamante',
                slug: 'suitess',
                published: true,
                companyId: company.id,
                weekdaysPrice: 100,
                weekendPrice: 150,
                extraAdultPrice: 50,
                chargeExtraAdultHigherThan: 2,
                medias: {
                    create: {
                        media: {
                            create: {
                                url: 'https://fastly.picsum.photos/id/16/2500/1667.jpg?hmac=uAkZwYc5phCRNFTrV_prJ_0rP0EdwJaZ4ctje2bY7aE',
                                companyId: company.id,
                                metadata: { mimetype: 'image/jpg' },
                            },
                        },
                    },
                },
                housingUnits: {
                    createMany: {
                        data: [{ name: '204' }, { name: '205' }],
                    },
                },
            },
        })
        console.log('Added default housing unit type')

        await tx.housingUnitType.create({
            include: { housingUnits: true },
            data: {
                name: 'Chale Supreme',
                slug: 'chale',
                published: true,
                companyId: company.id,
                weekdaysPrice: 100,
                weekendPrice: 150,
                extraAdultPrice: 50,
                chargeExtraAdultHigherThan: 2,
                medias: {
                    create: {
                        media: {
                            create: {
                                url: 'https://fastly.picsum.photos/id/15/2500/1667.jpg?hmac=Lv03D1Y3AsZ9L2tMMC1KQZekBVaQSDc1waqJ54IHvo4',
                                companyId: company.id,
                                metadata: { mimetype: 'image/jpg' },
                            },
                        },
                    },
                },
                housingUnits: {
                    createMany: {
                        data: [{ name: '304' }, { name: '502' }],
                    },
                },
            },
        })
        console.log('Added default housing unit type')
        //Facilities
        await tx.facility.createMany({
            data: facilities as Facility[],
        })
        console.log('Added default facilities')
        //Services
        const barco = await tx.service.create({
            data: {
                name: 'Passeio de Barco',
                published: true,
                billingType: 'PER_GUEST_DAILY',
                price: 200,
                adults: 3,
                minDaily: 1,
                minNotice: 1,
                onlineSale: true,
                panelSale: false,
                seasonalSale: true,
                seasonStart: new Date('2025-02-21T14:30:00.000Z'),
                seasonEnd: new Date('2025-02-22T14:30:00.000Z'),
                description: 'Enjoy a soothing massage during your stay',
                included: 'Free Wi-Fi, Breakfast, Swimming Pool Access',
                notes: 'Seasonal availability, blackout dates apply.',
                coverMedia: {
                    create: {
                        url: 'https://fastly.picsum.photos/id/16/2500/1667.jpg?hmac=uAkZwYc5phCRNFTrV_prJ_0rP0EdwJaZ4ctje2bY7aE',
                        company: {
                            connect: {
                                id: company.id,
                            },
                        },
                        metadata: { mimetype: 'image/jpg' },
                    },
                },
                availableHousingUnitTypes: {},
                company: {
                    connect: {
                        id: company.id,
                    },
                },
                medias: {
                    create: {
                        media: {
                            create: {
                                url: 'https://fastly.picsum.photos/id/28/4928/3264.jpg?hmac=GnYF-RnBUg44PFfU5pcw_Qs0ReOyStdnZ8MtQWJqTfA',
                                companyId: company.id,
                                metadata: { mimetype: 'image/jpeg' },
                            },
                        },
                    },
                },
            },
        })
        console.log('Added default service 1')
        await tx.service.create({
            data: {
                name: 'Aula de Yoga',
                published: true,
                billingType: 'PER_RESERVATION',
                price: 150,
                adults: 20,
                minDaily: 1,
                minNotice: 2,
                onlineSale: false,
                panelSale: true,
                seasonalSale: false,
                seasonStart: new Date('2025-03-01T09:00:00.000Z'),
                seasonEnd: new Date('2025-03-31T18:00:00.000Z'),
                description:
                    'Join our calming yoga sessions to start your day right.',
                included: 'Yoga Mats, Water, Towel',
                notes: 'Bring your own yoga mat if preferred.',
                coverMedia: {
                    create: {
                        url: 'https://fastly.picsum.photos/id/7/367/267.jpg?hmac=7scfIEZwG08cgYCiNifF6mEOaFpXAt2N-Q7oaA37ZQk',
                        companyId: company.id,
                        metadata: { mimetype: 'image/jpeg' },
                    },
                },
                availableHousingUnitTypes: {},
                company: {
                    connect: {
                        id: company.id,
                    },
                },
                medias: {
                    create: {
                        media: {
                            create: {
                                url: 'https://fastly.picsum.photos/id/50/4608/3072.jpg?hmac=E6WgCk6MBOyuRjW4bypT6y-tFXyWQfC_LjIBYPUspxE',
                                companyId: company.id,
                                metadata: { mimetype: 'image/jpeg' },
                            },
                        },
                    },
                },
            },
        })
        console.log('Added default service 2')
        //Banner
        await tx.banner.create({
            data: {
                name: 'Promoção de Verão',
                published: true,
                position: 'HOME_TOP',
                order: 1,
                title: 'Descontos Imperdíveis!',
                description: 'Aproveite os melhores descontos da temporada.',
                action: 'CUSTOM',
                actionButtonText: 'Compre Agora',
                actionButtonLink: 'https://www.exemplo.com/comprar',
                startAt: new Date('2025-03-10T00:00:00Z'),
                endAt: new Date('2025-03-20T00:00:00Z'),
                companyId: company.id,
                medias: {
                    create: {
                        media: {
                            create: {
                                url: 'https://fastly.picsum.photos/id/42/3456/2304.jpg?hmac=dhQvd1Qp19zg26MEwYMnfz34eLnGv8meGk_lFNAJR3g',
                                companyId: company.id,
                                metadata: { mimetype: 'image/jpg' },
                            },
                        },
                    },
                },
            },
        })
        console.log('Added default banner')

        //Reservation
        await tx.reservation.create({
            data: {
                status: ReservationStatus.CONFIRMED,
                sellerUserId: user2.id,
                saleChannel: 'BOOKSUITE',
                startDate: new Date('2025-01-14T13:19:15.271598Z'),
                endDate: new Date('2025-01-14T13:19:15.271598Z'),
                totalDays: 7,
                finalPrice: 1200,
                adults: 2,
                notes: 'Featured booking',
                reservationCode: '000001',
                housingUnitId: suiteDiamante.housingUnits[0].id,
                companyId: company.id,
                rateOptionId: null,
                services: {
                    create: {
                        serviceId: barco.id,
                    },
                },
            },
        })

        console.log('Added default reservation')

        if (dbRole) {
            const salt = await bcrypt.genSalt()

            const passwordOwner = await bcrypt.hash('admin123', salt)
            await tx.user.create({
                data: {
                    firstName: 'BookSuite Admin',
                    email: 'admin@booksuite.com.br',
                    password: `${passwordOwner}`,
                    isAdmin: true,
                    userCompanyRelation: {
                        create: {
                            companyId: company.id,
                            roleId: dbRole.id,
                        },
                    },
                },
            })
        }

        console.log('Added default admin user')
    })
}
