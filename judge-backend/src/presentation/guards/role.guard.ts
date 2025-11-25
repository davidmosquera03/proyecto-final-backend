import { CanActivate, ExecutionContext, ForbiddenException, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Observable } from 'rxjs';

@Injectable()
export class RoleGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  canActivate(ctx: ExecutionContext): boolean {
    const requiredRoles = this.reflector.get<string[]>('roles', ctx.getHandler());
    if (!requiredRoles) return true;
    const { user } = ctx.switchToHttp().getRequest();
    return requiredRoles.includes(user.role);
  }
}
@Injectable()
export class AdminGuard implements CanActivate {
  canActivate(context: ExecutionContext): boolean | Promise<boolean> | Observable<boolean> {
    const req = context.switchToHttp().getRequest();
    const user = req.user;
    // Si no hay usuario, permitir que JwtAuthGuard haya fallado antes
    if (!user) return false;
    if (user.role !== 'ADMIN' && user.role !== 'TEACHER') {
      throw new ForbiddenException('Admin or Teacher role required');
    }
    return true;
  }
}