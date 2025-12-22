import { GetUserBaseReqDto, GetUserBaseResDto } from '@/internal/auth/application/dto/get.dto';
import {
  GetDeviceIPAdressReqDto,
  GetDeviceIPAdressResDto,
} from '@/internal/auth/application/dto/getDeviceIPAdress.dto';
import { LoginUserReqDto, LoginUserResDto } from '@/internal/auth/application/dto/login.dto';
import { RegistrateReqDto, RegistrateResDto } from '@/internal/auth/application/dto/registrate.dto';
import {
  UpdateRegistrateUserReqDto,
  UpdateRegistrateUserResDto,
} from '@/internal/auth/application/dto/updateRegistratePassword.dto';
import { VerifyRegistrateUserReqDto, VerifyRegistrateUserResDto } from '@/internal/auth/application/dto/verify.dto';

export interface AuthServiceInterface {
  registrate(reqData: RegistrateReqDto): Promise<RegistrateResDto>;
  verify(reqData: VerifyRegistrateUserReqDto): Promise<VerifyRegistrateUserResDto>;
  updatePassword(reqdata: UpdateRegistrateUserReqDto): Promise<UpdateRegistrateUserResDto>;
  login(reqData: LoginUserReqDto): Promise<LoginUserResDto>;
  getUserPermissionsByUserId(reqData: GetUserBaseReqDto): Promise<GetUserBaseResDto>;
  getDeviceIPAddress(reqData: GetDeviceIPAdressReqDto): Promise<GetDeviceIPAdressResDto>;
}
