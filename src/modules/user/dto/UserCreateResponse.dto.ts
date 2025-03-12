import { ApiProperty } from '@nestjs/swagger'

export class UserResponseDTO {
    @ApiProperty({ example: 'user@gmail.com' })
    email!: string

    @ApiProperty({ example: 'user' })
    firstName!: string

    @ApiProperty({ example: 'user', nullable: true, type: String })
    lastName: string | null

    @ApiProperty({ example: '489831034', nullable: true, type: String })
    phone: string | null

    @ApiProperty({ example: '123' })
    password!: string

    // @IsDefined()
    // @IsBoolean()
    // isAdmin!: boolean

    @ApiProperty({
        example: '{preferences: {notifications: true}',
        required: false,
        nullable: true,
    })
    metaData: unknown
}
