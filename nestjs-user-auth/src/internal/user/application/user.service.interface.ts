import {
  ChangePasswordReqDto,
  ChangePasswordResDto,
  ConfirmChangePasswordReqDto,
  ConfirmChangePasswordResDto,
} from '@/internal/user/application/dto/changePassword.dto';
import { CreateProfileReqDto, CreateProfileResDto } from '@/internal/user/application/dto/createProfile.dto';
import { SetRoleToUserReqDto, SetRoleToUserResDto } from '@/internal/user/application/dto/setRole.dto';
import { UpdateUserProfileReqDto, UpdateUserProfileResDto } from '@/internal/user/application/dto/update.dto';
import {
  VerifyChangePasswordReqDto,
  VerifyChangePasswordResDto,
} from '@/internal/user/application/dto/verifyChangePassword.dto';
import { CheckExistUserReqDto } from 'src/internal/user/application/dto/checkExist.dto';
import { CreateUserReqDto, CreateUserResDto } from 'src/internal/user/application/dto/create.dto';
import { SoftDeleteUserReqDto, SoftDeleteUserResDto } from 'src/internal/user/application/dto/delete.dto';
import {
  GetUserInfoReqDto,
  GetUserInfoResDto,
  UserGetListReqDto,
  UserGetListResDto,
} from 'src/internal/user/application/dto/get.dto';

export interface UserServiceInterface {
  getListUsersAvalable(reqDto: UserGetListReqDto): Promise<UserGetListResDto>;
  getUserInfo(reqDto: GetUserInfoReqDto): Promise<GetUserInfoResDto>;
  isExistUser(reqDto: CheckExistUserReqDto): Promise<CheckExistUserReqDto>;
  createUser(reqDto: CreateUserReqDto): Promise<CreateUserResDto>;
  softDeleteUser(reqDto: SoftDeleteUserReqDto): Promise<SoftDeleteUserResDto>;
  createProfile(reqData: CreateProfileReqDto): Promise<CreateProfileResDto>;
  changePassword(reqData: ChangePasswordReqDto): Promise<ChangePasswordResDto>;
  verifyChangePassword(reqData: VerifyChangePasswordReqDto): Promise<VerifyChangePasswordResDto>;
  confirmChangePassword(reqData: ConfirmChangePasswordReqDto): Promise<ConfirmChangePasswordResDto>;
  updateUserProfile(reqData: UpdateUserProfileReqDto): Promise<UpdateUserProfileResDto>;
  setRoleToUser(reqData: SetRoleToUserReqDto): Promise<SetRoleToUserResDto>;
}
