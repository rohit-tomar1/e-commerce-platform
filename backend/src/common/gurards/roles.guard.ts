import { Injectable, ExecutionContext } from '@nestjs/common';
import { JwtAuthGuard } from './jwt-auth.guard';
import { ROLES_KEY } from '../decorators/roles.decorator';
import { UserRole } from '../enums/user-role.enum';
import { Reflector } from '@nestjs/core';

@Injectable()
export class JwtRolesGuard extends JwtAuthGuard {
  constructor(
    protected readonly reflector: Reflector, // Must match parent's access modifier
  ) {
    super(reflector); // Pass reflector to parent
  }

  async canActivate(context: ExecutionContext): Promise<boolean> {
    // First check JWT authentication
    console.log('canActivate',"121")

    const canActivate = await super.canActivate(context);
    console.log('canActivate',canActivate)
  
    if (!canActivate) return false;

    // Then check roles
    const requiredRoles = this.reflector.getAllAndOverride<UserRole[]>(
      ROLES_KEY,
      [context.getHandler(), context.getClass()],
    );
    console.log('requiredRoles',requiredRoles)

    if (!requiredRoles) return true;

    const request = context.switchToHttp().getRequest();
    const user = request.user;
    console.log('user',user)
    if (!user?.role) {
      return false;
    }

    return requiredRoles.some((role) => user.role === role);
  }
}
