import {
    InstallmentsTax,
    MapCoordinates as TypeMapCoordinates,
} from './common/types/json'
import {
    CompanyContact as TypeCompanyContact,
    CompanySettings as TypeCompanySettings,
    MediaMetadata as TypeMediaMetadata,
} from './modules/company/types/json'

declare global {
    namespace PrismaJson {
        type CompanySettings = TypeCompanySettings
        type CompanyContact = TypeCompanyContact
        type MediaMetadata = TypeMediaMetadata
        type WeekDays = number[]
        type Installments = InstallmentsTax[]
        type MapCoordinates = TypeMapCoordinates
    }
}
