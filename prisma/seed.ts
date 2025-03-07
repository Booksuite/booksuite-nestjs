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

    const dbRole = await client.role.findUnique({
        where: {
            slug: 'admin',
        },
    })

    const company = await client.company.create({
        data: {
            name: 'BookSuite',
            address: 'Rua das Flores, 123',
            number: '123',
            city: 'São Paulo',
            state: 'SP',
            country: 'Brasil',
            logo: 'https://booksuite.com.br/logo.png',
            slug: 'booksuite',
            responsible: 'BookSuite',
            docType: 'CNPJ',
            identification: '1234567890',
            companyName: 'BookSuite',
            published: true,
        },
    })

    await client.housingUnitType.create({
        data: {
            name: 'Apartamento',
            slug: 'apartment',
            companyId: company.id,
            weekdaysPrice: 100,
            weekendPrice: 150,
            extraAdultPrice: 50,
            chargeExtraAdultHigherThan: 2,
            housingUnits: {
                createMany: {
                    data: [{ name: '204' }, { name: '205' }],
                },
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
