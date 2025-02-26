import { Prisma } from '@prisma/client'

import {
    CompanyContact as TypeCompanyContact,
    CompanySettings as TypeCompanySettings,
} from './modules/company/types/json'

declare global {
    namespace PrismaJson {
        type CompanySettings = TypeCompanySettings
        type CompanyContact = TypeCompanyContact
        type MediaMetadata = Prisma.InputJsonValue & {
            mimetype: string
        }
    }
}
