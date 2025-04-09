import path from 'node:path'
import { defineConfig } from 'prisma/config'

export default defineConfig({
    schema: {
        kind: 'multi',
        folderPath: path.join(__dirname, 'prisma', 'schema'),
    },
    earlyAccess: true,
})
