import { HttpStatus, Inject, Injectable } from '@nestjs/common';
import { AuthRepositoryInterface } from '../domain/repository/auth.repository.interface';
import { Utils } from '@/utils/utils';
import { LoginUserResDto } from './dto/login.dto';
import { UserEntity } from '@/internal/user/domain/entity/user.entity';
import { DatabaseError, ErrorCustom, InternalServerError } from '@/utils/ErrorCustom';

@Injectable()
export class RefreshTokenUseCase {
  constructor(@Inject('AuthRepository') private readonly authRepo: AuthRepositoryInterface) {}

  async execute(refreshToken: string): Promise<LoginUserResDto> {
    try {
      const payload = Utils.verifyJWTToken<{ id: string; email: string }>(refreshToken, 'refresh');
      if (!payload) {
        throw new ErrorCustom(HttpStatus.UNAUTHORIZED, 'Invalid refresh token');
      }

      const userBaseEntity: UserEntity | null = await this.authRepo.getOneByUserId(payload.id);
      if (userBaseEntity == null) {
        throw new ErrorCustom(HttpStatus.NOT_FOUND, 'User not found');
      }

      // create new tokens
      const token = Utils.generateJWTToken(
        {
          id: userBaseEntity.id,
          email: userBaseEntity.account,
        },
        'login',
      );

      const newRefreshToken = Utils.generateJWTToken(
        {
          id: userBaseEntity.id,
          email: userBaseEntity.account,
        },
        'refresh',
      );

      // cập nhật lại login info
      userBaseEntity.loginTime = Date.now();
      if ((await this.authRepo.updateLoginInfoInUsersTable(userBaseEntity)) != 1) {
        throw new DatabaseError('Error: update user login info');
      }

      return new LoginUserResDto(token, newRefreshToken);
    } catch (error) {
      if (error instanceof ErrorCustom) {
        throw error;
      }
      throw new InternalServerError();
    }
  }
}
