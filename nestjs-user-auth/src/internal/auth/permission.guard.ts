/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
import { GetUserBaseReqDto, GetUserBaseResDto, RoleResDto } from '@/internal/auth/application/dto/get.dto';
import { CanActivate, ExecutionContext, Inject, Injectable, UnauthorizedException } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { GetUserPermissionsByUserIdUseCase } from './application/GetUserPermissionsByUserIdUseCase';

@Injectable()
export class PermissionGuard implements CanActivate {
  constructor(
    @Inject(GetUserPermissionsByUserIdUseCase)
    private readonly getUserPermissionsByUserId: GetUserPermissionsByUserIdUseCase,
    @Inject(Reflector)
    private readonly reflector: Reflector, // read metadata
  ) {}

  async canActivate(context: ExecutionContext) {
    const userContext = context.switchToHttp().getRequest().user;
    if (!userContext) {
      throw new UnauthorizedException('User not found');
    }
    console.log('🚀 ~ PermissionGuard ~ canActivate ~ userContext:', userContext);

    // gọi dịch vụ lấy quyền của user từ DB hoặc cache
    const foundUser: GetUserBaseResDto = await this.getUserPermissionsByUserId.execute(
      new GetUserBaseReqDto(userContext.id),
    );
    if (foundUser.roles.length === 0) {
      throw new UnauthorizedException('Not found permissions for this user');
    }
    console.log('🚀 ~ PermissionGuard ~ canActivate ~ foundUser:', foundUser);
    foundUser.roles.forEach((value) => {
      console.log(value.permissions);
    });
    const requiredPermissions: string[] = this.reflector.get<string[]>('permissions', context.getHandler());
    console.log('🚀 :  PermissionGuard :  canActivate :  requiredPermissions:', requiredPermissions);
    const requiredResources: string[] = this.reflector.get<string[]>('resources', context.getHandler());
    console.log('🚀 :  PermissionGuard :  canActivate :  requiredResources:', requiredResources);
    const requiredActors: string[] = this.reflector.get<string[]>('actors', context.getHandler());
    console.log('🚀 :  PermissionGuard :  canActivate :  requiredActors:', requiredActors);

    if (!requiredPermissions || !requiredResources || !requiredActors) {
      throw new UnauthorizedException('Not found permissions for this user');
    }

    const foundUserRoles: RoleResDto[] = foundUser.roles;

    for (const role of foundUserRoles) {
      console.log('🚀 ~ Checking role:', role.name);
      if (!requiredActors.includes(role.name)) continue; // bỏ qua role không đúng loại
      for (const permission of role.permissions) {
        const hasPermission =
          requiredPermissions.includes(permission.name) && requiredResources.includes(permission.resource);
        if (hasPermission) return true;
      }
    }

    // nếu chạy hết vòng lặp mà chưa return true
    throw new UnauthorizedException('This user does not have required permission or resource');
  }
}
