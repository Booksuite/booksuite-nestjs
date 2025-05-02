const { PrismaClient } = require('@prisma/client')
const fs = require('fs')
const path = require('path')

const prisma = new PrismaClient()

async function dumpDatabase() {
    try {
        // Create dump directory if it doesn't exist
        const dumpDir = path.join(__dirname, '../dumps')
        if (!fs.existsSync(dumpDir)) {
            fs.mkdirSync(dumpDir, { recursive: true })
        }

        // Get all models from Prisma schema
        const models = Object.keys(prisma).filter(
            (key) => !key.startsWith('_') && !key.startsWith('$'),
        )

        // Dump each model's data
        for (const model of models) {
            try {
                const data = await prisma[model].findMany()
                const filePath = path.join(dumpDir, `${model}.json`)
                fs.writeFileSync(filePath, JSON.stringify(data, null, 2))
                console.log(`Dumped ${model} data to ${filePath}`)
            } catch (error) {
                console.error(`Error dumping ${model}:`, error)
            }
        }

        console.log('Database dump completed successfully!')
    } catch (error) {
        console.error('Error during database dump:', error)
    } finally {
        await prisma.$disconnect()
    }
}

dumpDatabase()
