import { Utils } from '@/utils/utils';
import { LoginUserReqDto, LoginUserResDto } from './dto/login.dto';
import { AuthRepositoryInterface } from '../domain/repository/auth.repository.interface';
import { UserEntity } from '@/internal/user/domain/entity/user.entity';
import { DatabaseError, ErrorCustom, InternalServerError } from '@/utils/ErrorCustom';
import { HttpStatus, Inject, Injectable } from '@nestjs/common';

@Injectable()
export class UserLoginUseCase {
  constructor(@Inject('AuthRepository') private readonly authRepo: AuthRepositoryInterface) {}
  async execute(request: LoginUserReqDto): Promise<LoginUserResDto> {
    try {
      const { email, password } = request;

      // tìm user trong bảng userBase
      const userBaseEntity: UserEntity | null = await this.authRepo.getOneByEmail(email);
      if (userBaseEntity == null) {
        throw new ErrorCustom(HttpStatus.NOT_FOUND, 'User not found');
      }

      if (!(await Utils.compareHashStringUsingBcryptJS(password, userBaseEntity.password))) {
        throw new ErrorCustom(HttpStatus.UNAUTHORIZED, 'Password incorrect');
      }

      // create token
      const token = Utils.generateJWTToken(
        {
          id: userBaseEntity.id,
          email: userBaseEntity.account,
        },
        'login',
      );

      const refreshToken = Utils.generateJWTToken(
        {
          id: userBaseEntity.id,
          email: userBaseEntity.account,
        },
        'refresh',
      );

      // cập nhật lại trạng thái của row trong bảng verification
      userBaseEntity.loginTime = Date.now();
      userBaseEntity.loginIp = 'localhost';

      if ((await this.authRepo.updateLoginInfoInUsersTable(userBaseEntity)) != 1) {
        throw new DatabaseError('Error: update user login info');
      }

      return new LoginUserResDto(token, refreshToken);
    } catch (error) {
      if (error instanceof ErrorCustom) {
        throw error;
      }
      throw new InternalServerError();
    }
  }
}
