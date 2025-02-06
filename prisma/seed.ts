import { PrismaClient } from '@prisma/client'
import bcrypt from 'bcrypt'

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

    if (dbRole) {
        const salt = await bcrypt.genSalt()

        const passwordOwner = await bcrypt.hash('admin123', salt)
        await client.user.createMany({
            data: [
                {
                    name: 'BookSuite Admin',
                    email: 'admin@booksuite.com.br',
                    password: `${passwordOwner}`,
                    roleId: dbRole.id,
                },
            ],
            skipDuplicates: true,
        })
    }

    console.log('Added default admin user')
}
