import { IsDate, IsDefined, IsInt, IsOptional } from 'class-validator'

import { Experience, Extra, Offer } from './'

export class OfferExtraExperience {
    @IsDefined()
    @IsInt()
    id!: number

    @IsDefined()
    @IsInt()
    offerId!: number

    @IsDefined()
    offer!: Offer

    @IsOptional()
    @IsInt()
    extraId?: number

    @IsOptional()
    extra?: Extra

    @IsOptional()
    @IsInt()
    experienceId?: number

    @IsOptional()
    experience?: Experience

    @IsDefined()
    @IsDate()
    createdAt!: Date

    @IsDefined()
    @IsDate()
    updatedAt!: Date
}
