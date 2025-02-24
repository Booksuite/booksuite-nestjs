import {
    CompanyContact as TypeCompanyContact,
    CompanySettings as TypeCompanySettings,
} from './modules/company/types/json'

declare global {
    namespace PrismaJson {
        type CompanySettings = TypeCompanySettings
        type CompanyContact = TypeCompanyContact
    }
}
