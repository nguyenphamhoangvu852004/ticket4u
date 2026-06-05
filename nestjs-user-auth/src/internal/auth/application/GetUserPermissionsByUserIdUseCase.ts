import { UserEntity } from '@/internal/user/domain/entity/user.entity';
import { UserRepositoryInterface } from '@/internal/user/domain/repository/user.repository.interface';
import { HttpStatus, Inject, Injectable } from '@nestjs/common';
import { GetUserBaseReqDto, GetUserBaseResDto, PermissionResDto, RoleResDto } from './dto/get.dto';
import { AuthRepositoryInterface } from '../domain/repository/auth.repository.interface';
import { ErrorCustom } from '@/utils/ErrorCustom';
import { HttpMessage } from '@/internal/global/ResponseData';

@Injectable()
export class GetUserPermissionsByUserIdUseCase {
  constructor(
    @Inject('AuthRepository') private readonly authRepo: AuthRepositoryInterface,
    @Inject('UserRepository') private readonly userRepo: UserRepositoryInterface,
  ) {}

  async execute(reqDto: GetUserBaseReqDto): Promise<GetUserBaseResDto> {
    try {
      // gọi repo để lấy user base
      const userBaseEntity: UserEntity | null = await this.authRepo.getOneByUserId(reqDto.userId);
      if (userBaseEntity == null) {
        throw new ErrorCustom(HttpStatus.NOT_FOUND, 'User not found');
      }
      const newUserBaseEntityResDto = new GetUserBaseResDto(
        userBaseEntity.id,
        userBaseEntity.account,
        userBaseEntity.password,
        userBaseEntity.salt,
        userBaseEntity.loginTime,
        userBaseEntity.logoutTime,
        userBaseEntity.loginIp,
        [],
        userBaseEntity.creatorId,
        userBaseEntity.modifierId,
        userBaseEntity.deletorId,
        userBaseEntity.createdAt,
        userBaseEntity.modifiedAt,
        userBaseEntity.deletedAt,
      );

      const rolesResDto: RoleResDto[] = [];
      if (userBaseEntity.roles && userBaseEntity.roles.length > 0) {
        for (const role of userBaseEntity.roles) {
          const permissions: PermissionResDto[] = [];
          for (const permission of role.permissions) {
            permissions.push(new PermissionResDto(String(permission.id), permission.name, permission.resource));
          }
          rolesResDto.push(new RoleResDto(String(role.id), role.name, permissions));
        }
        newUserBaseEntityResDto.roles = rolesResDto;
      }
      return newUserBaseEntityResDto;
    } catch (error) {
      if (error instanceof ErrorCustom) {
        throw error;
      }
      throw new ErrorCustom(HttpStatus.INTERNAL_SERVER_ERROR, HttpMessage.INTERNAL_SERVER_ERROR);
    }
  }
}
