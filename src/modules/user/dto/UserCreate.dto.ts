import { ApiProperty } from '@nestjs/swagger'
import { Prisma } from '@prisma/client'
import { IsDefined, IsEmail, IsOptional, IsString } from 'class-validator'

export class UserCreateDTO {
    @ApiProperty({ example: 'user@gmail.com' })
    @IsDefined()
    @IsEmail()
    email!: string

    @ApiProperty({ example: 'user' })
    @IsDefined()
    @IsString()
    firstName!: string

    @ApiProperty({ example: 'user' })
    @IsOptional()
    @IsString()
    lastName?: string

    @ApiProperty({ example: '489831034' })
    @IsOptional()
    @IsString()
    phone?: string

    @ApiProperty({ example: '123' })
    @IsDefined()
    @IsString()
    password!: string

    // @IsDefined()
    // @IsBoolean()
    // isAdmin!: boolean

    @ApiProperty({
        example: '{preferences: {notifications: true}',
        required: false,
    })
    @IsOptional()
    metaData?: Prisma.NullableJsonNullValueInput | Prisma.InputJsonValue
}
