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

    @ApiProperty({
        example: true,
    })
    isAdmin!: boolean

    @ApiProperty({
        example: '123456',
        nullable: true,
        type: String,
    })
    confirmationCode: string | null

    @ApiProperty({
        example: '{preferences: {notifications: true}',
        required: false,
        nullable: true,
    })
    metaData: unknown

    @ApiProperty({
        example: '123e4567-e89b-12d3-a456-426614174000',
        type: String,
    })
    id: string

    @ApiProperty({
        example: '2021-01-01T00:00:00.000Z', //iso format
        type: Date,
    })
    createdAt: Date

    @ApiProperty({
        example: '2021-01-01T00:00:00.000Z', //iso format
        type: Date,
    })
    updatedAt: Date

    @ApiProperty({
        example: '2021-01-01T00:00:00.000Z', //iso format
        type: Date,
        nullable: true,
    })
    deletedAt: Date | null
}
