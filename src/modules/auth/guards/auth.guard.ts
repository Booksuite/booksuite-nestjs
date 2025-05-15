import { Injectable, CanActivate, ExecutionContext, UnauthorizedException, HttpException, HttpStatus } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(
    private reflector: Reflector,
    private jwtService: JwtService,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    // First, handle JWT authentication
    const request = context.switchToHttp().getRequest();
    const authHeader = request.headers.authorization;

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      throw new UnauthorizedException('No token provided');
    }

    const token = authHeader.split(' ')[1];
    
    try {
      // Verify and decode the JWT token
      const decoded = this.jwtService.verify(token);
      
      // Attach the user data from token to the request object
      request.user = decoded;

      // Then, handle permission checks
      const requiredPermissions = this.reflector.get<string[]>('permissions', context.getHandler());
      if (!requiredPermissions) {
        return true;
      }

      if (!decoded.permissions) {
        throw new UnauthorizedException('User permissions not found');
      }

      const userPermissions = decoded.permissions;
      
      // Check if user has all required permissions
      return requiredPermissions.every(permission => {        
        return userPermissions.includes(permission);
      });
    } catch (error) {
      throw new HttpException(error.message, 498);
    }
  }
} 