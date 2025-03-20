import { ApiProperty } from '@nestjs/swagger'
import { Prisma } from '@prisma/client'
import { IsEmail, IsOptional, IsString } from 'class-validator'

export class UserUpdateDTO {
    @ApiProperty({ example: 'user@gmail.com', required: false })
    @IsOptional()
    @IsEmail()
    email?: string

    @ApiProperty({ example: 'user', required: false })
    @IsOptional()
    @IsString()
    firstName?: string

    @ApiProperty({ example: 'user', required: false, nullable: true })
    @IsOptional()
    @IsString()
    lastName?: string | null

    @ApiProperty({ example: '489831034', required: false, nullable: true })
    @IsOptional()
    @IsString()
    phone?: string | null

    @ApiProperty({ example: '123', required: false })
    @IsOptional()
    @IsString()
    password?: string

    @ApiProperty({
        example: '{preferences: {notifications: true}',
        required: false,
        nullable: true,
    })
    @IsOptional()
    metaData?: Prisma.NullableJsonNullValueInput | Prisma.InputJsonValue | null
}
