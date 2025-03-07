/* eslint-disable no-console */
import { PrismaClient } from '@prisma/client'
import * as bcrypt from 'bcrypt'

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
    await client.role.createMany({
        skipDuplicates: true,
        data: [
            { name: 'Admin', slug: 'admin' },
            { name: 'Usuário', slug: 'user' },
        ],
    })

    console.log('Added default roles data')

    const user1 = await client.user.create({
        data: {
            email: 'john.doe@gmail.com',
            firstName: 'John',
            lastName: 'Doe',
            phone: '489831034',
            password: 'securePassword123',
            metaData: { preferences: { notifications: true } },
        },
    })

    const user2 = await client.user.create({
        data: {
            email: 'jane.smith@gmail.com',
            firstName: 'Jane',
            lastName: 'Smith',
            phone: '479831024',
            password: 'anotherSecurePassword456',
            metaData: { preferences: { notifications: false } },
        },
    })

    const dbRole = await client.role.findUnique({
        where: {
            slug: 'admin',
        },
    })

    //Company Data
    const company = await client.company.create({
        data: {
            name: 'BookSuite',
            address: 'Rua das Flores, 123',
            number: '123',
            city: 'São Paulo',
            state: 'SP',
            country: 'Brasil',
            logo: 'https://booksuite.com.br/logo.png',
            slug: 'booksuites',
            responsible: 'BookSuite',
            docType: 'CNPJ',
            identification: '1234567890',
            companyName: 'BookSuite',
            published: true,
        },
    })

    const categorie = await client.serviceCategory.create({
        data: { name: 'Aventura' },
    })

    //HousingUnitTypes And HousingUnits
    const suiteDiamante = await client.housingUnitType.create({
        data: {
            name: 'Suite Diamante',
            slug: 'suitess',
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

    await client.housingUnitType.create({
        data: {
            name: 'Chale Supreme',
            slug: 'chale',
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

    //Facilities
    await client.facility.createMany({
        data: [
            {
                name: 'WiFi',
                type: 'COMPANY',
                category: 'INTERNET',
            },
            {
                name: 'TV a cabo/smart TV',
                type: 'HOUSING_UNIT_TYPE',
                category: 'STRUCTURE',
            },
            {
                name: 'Spa e massagem',
                type: 'HOUSING_UNIT_TYPE',
                category: 'SERVICES',
            },
            {
                name: 'Elevador',
                type: 'COMPANY',
                category: 'STRUCTURE',
            },
        ],
    })

    //Services
    const barco = await client.service.create({
        data: {
            name: 'Passeio de Barco',
            published: true,
            billType: 'PER_PERSON',
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
            videoUrl: 'https://www.example.com/video',
            categoryId: categorie.id,
            companyId: company.id,
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

    await client.service.create({
        data: {
            name: 'Aula de Yoga',
            published: true,
            billType: 'PER_SESSION',
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
            videoUrl: 'https://www.example.com/yoga-video',
            categoryId: categorie.id,
            companyId: company.id,
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

    //Banner
    await client.banner.create({
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

    //Reservation
    await client.reservation.create({
        data: {
            status: 'CONFIRMED',
            userId: user1.id,
            sellerUserId: user2.id,
            saleChannel: 'BOOKSUITE',
            startDate: new Date('2025-01-14T13:19:15.271598Z'),
            endDate: new Date('2025-01-14T13:19:15.271598Z'),
            totalDays: 7,
            adults: 2,
            children: 1,
            notes: 'Featured booking',
            reservationCode: '000001',
            housingUnitId: suiteDiamante.id,
            companyId: company.id,
            services: {
                connect: { id: barco.id },
            },
        },
    })

    if (dbRole) {
        const salt = await bcrypt.genSalt()

        const passwordOwner = await bcrypt.hash('admin123', salt)
        await client.user.create({
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
}
