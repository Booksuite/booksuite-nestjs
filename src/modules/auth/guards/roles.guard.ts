import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { ROLES_KEY } from '../decorators/roles.decorator';
import { AccessControl } from 'accesscontrol';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    const requiredRoles = this.reflector.getAllAndOverride<string[]>(ROLES_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);

    if (!requiredRoles) {
      return true;
    }

    const request = context.switchToHttp().getRequest();
    const { user } = request;
    const ac = new AccessControl();

    // Define roles and permissions
    ac.grant('user')
      // User profile management
      .readOwn('profile')
      .updateOwn('profile')
      // Reservations
      .readOwn('reservations')
      .createOwn('reservations')
      .updateOwn('reservations')
      // Housing units
      .read('housingUnits')
      // Services
      .read('services')
      // Companies
      .read('companies');

    ac.grant('admin')
      .extend('user')
      // User management
      .readAny('profile')
      .createAny('profile')
      .updateAny('profile')
      .deleteAny('profile')
      // Reservation management
      .readAny('reservations')
      .createAny('reservations')
      .updateAny('reservations')
      .deleteAny('reservations')
      // Housing unit management
      .readAny('housingUnits')
      .createAny('housingUnits')
      .updateAny('housingUnits')
      .deleteAny('housingUnits')
      // Service management
      .readAny('services')
      .createAny('services')
      .updateAny('services')
      .deleteAny('services')
      // Company management
      .readAny('companies')
      .createAny('companies')
      .updateAny('companies')
      .deleteAny('companies')
      // Role management
      .readAny('roles')
      .createAny('roles')
      .updateAny('roles')
      .deleteAny('roles');

    // Check if user has required role
    return requiredRoles.some((role) => {
      const permission = ac.can(user.role)[role];
      
      // If the permission is granted, check resource ownership for 'own' actions
      if (permission.granted) {
        // Get the resource ID from the request
        const resourceId = request.params.id;
        
        // If it's an 'own' action and we have a resource ID, check ownership
        if (permission.attributes.includes('own') && resourceId) {
          return this.checkResourceOwnership(request, role, resourceId);
        }
        
        return true;
      }
      
      return false;
    });
  }

  private checkResourceOwnership(request: any, role: string, resourceId: string): boolean {
    const { user } = request;
    
    // Extract the resource type from the role (e.g., 'read:profile' -> 'profile')
    const resourceType = role.split(':')[1];
    
    switch (resourceType) {
      case 'profile':
        // A user can only access their own profile
        return resourceId === user.id;
        
      case 'reservations':
        // Check if the reservation belongs to the user
        // You would need to implement this check in your service
        return this.checkReservationOwnership(user.id, resourceId);
        
      // Add more resource types as needed
      default:
        return false;
    }
  }

  private checkReservationOwnership(userId: string, reservationId: string): boolean {
    // This is a placeholder. You would implement the actual check in your service
    // For example:
    // return this.reservationService.isOwner(userId, reservationId);
    return false;
  }
} 