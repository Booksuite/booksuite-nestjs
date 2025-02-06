export interface SaveCompanyPayload {
    name: string
    slug: string
    shortDescription?: string | null
    description?: string | null

    policy?: string
    cancelPolicy?: string

    branchBusiness?: string | null
    timezone?: string | null
    thumbnail?: string | null
    logo?: string | null
    logoFormat?: string | null
    favIcon?: string | null
    theme?: string | null

    responsible: string
    responsibleEmail?: string | null
    responsiblePhone?: string | null

    docType: string
    identification: string
    companyName: string
    stateRegistration?: string | null
    municipalRegistration?: string | null
    address: string
    number: string
    country: string
    state: string
    city: string
}
