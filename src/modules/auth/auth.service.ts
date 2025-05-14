import { Injectable, UnauthorizedException, ConflictException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { UserService } from '../user/user.service';
import { LoginDto } from './dto/Login.dto';
import { SignupDto } from './dto/Signup.dto';
import { AuthResponseDto } from './dto/AuthResponse.dto';
import { UserAuthResponseDTO } from '../user/dto/UserAuthResponse.dto copy';
import { SignupResponseDto } from './dto/SignupResponse.dto';

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private jwtService: JwtService,
  ) {}

  async validateUser(email: string, password: string, companyId: string): Promise<UserAuthResponseDTO | null> {
    const user = await this.userService.findByEmail(email, companyId);
    if (user && await bcrypt.compare(password, user.password)) {
      return user;
    }
    return null;
  }

  async signup(signupDto: SignupDto, companyId: string): Promise<SignupResponseDto> {
    // Check if user already exists
    const existingUser = await this.userService.findByEmail(signupDto.email, companyId);
    if (existingUser) {
      throw new ConflictException('Email already exists');
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(signupDto.password, 10);

    // Create the user
    const  {user, userCompanyRelation} = await this.userService.createWithCompany({
      ...signupDto,
      password: hashedPassword,
    }, companyId);

    // Generate JWT token
    const payload = { 
      email: user.email, 
      sub: user.id,
      permissions: userCompanyRelation.permissions
    };

    return {
      access_token: this.jwtService.sign(payload),
      user: {...user, userCompanyRelation: [userCompanyRelation]}
    };
  }

  async login(loginDto: LoginDto, companyId: string): Promise<AuthResponseDto> {
    const user = await this.validateUser(loginDto.email, loginDto.password, companyId);
    if (!user) {
      throw new UnauthorizedException('Invalid credentials');
    }
    if (user.userCompanyRelation.length===0) {
      throw new UnauthorizedException('User has no roles for this company');
    }

    const payload = { 
      email: user.email, 
      sub: user.id,
      permissions: user.userCompanyRelation[0].permissions
    };

    return {
      access_token: this.jwtService.sign(payload),
      user: user
    };
  }
} 