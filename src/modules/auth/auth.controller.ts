import { Controller, Post, Body,  Headers,  BadRequestException } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { AuthService } from './auth.service';
import { LoginDto } from './dto/Login.dto';
import { SignupDto } from './dto/Signup.dto';
import { AuthResponseDto } from './dto/AuthResponse.dto';
import { RefreshTokenDto } from './dto/RefreshToken.dto';

@ApiTags('Authentication')
@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('signup')
  @ApiOperation({ summary: 'User registration' })
  @ApiResponse({ type: AuthResponseDto })
  async signup(@Body() signupDto: SignupDto, @Headers('x-company-id') companyId: string): Promise<AuthResponseDto> {
    return this.authService.signup(signupDto, companyId);
  }

  @Post('login')
  @ApiOperation({ summary: 'User login' })
  @ApiResponse({ type: AuthResponseDto })
  async login(@Body() loginDto: LoginDto, @Headers('x-company-id') companyId: string): Promise<AuthResponseDto> {
    if(!companyId){
      throw new BadRequestException('Company ID is required');
    }
    return this.authService.login(loginDto, companyId);
  }

  @Post('refresh')
  @ApiOperation({ summary: 'Refresh access token' })
  @ApiResponse({ type: AuthResponseDto })
  async refreshToken(@Body() refreshTokenDto: RefreshTokenDto) {
    return this.authService.getNewAccessToken(refreshTokenDto);
  }
} 