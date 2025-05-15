import { UserAuthResponseDTO } from '@/modules/user/dto/UserAuthResponse.dto copy';
import { ApiProperty } from '@nestjs/swagger';

export class SignupResponseDto {
  @ApiProperty()
  access_token: string;

  @ApiProperty()
  refresh_token: string;

  @ApiProperty({ type: UserAuthResponseDTO })
  user: UserAuthResponseDTO
} 