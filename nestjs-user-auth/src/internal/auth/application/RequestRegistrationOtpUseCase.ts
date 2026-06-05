import { HttpStatus, Inject, Injectable } from '@nestjs/common';
import { RegistrateReqDto, RegistrateResDto } from './dto/registrate.dto';
import { Utils } from '@/utils/utils';
import { DatabaseError, ErrorCustom, InternalServerError } from '@/utils/ErrorCustom';
import { HttpMessage } from '@/internal/global/ResponseData';
import { AuthRepositoryInterface } from '../domain/repository/auth.repository.interface';
import { UserVerificationsEntity } from '../domain/entity/userVerifications.entity';
import { randomUUID } from 'crypto';
import { NodeMailerImplementation } from '@/libs/nodemailer/nodemailer';

@Injectable()
export class RequestRegistrationOtpUseCase {
  constructor(@Inject('AuthRepository') private readonly authRepo: AuthRepositoryInterface) {}
  async execute(reqData: RegistrateReqDto): Promise<RegistrateResDto> {
    try {
      // 1. encrypt email
      const verifyKeyHashed = Utils.hashString(reqData.verifyKey.toLowerCase());

      // 2. Check existed users table
      if (await this.authRepo.getOneByEmail(reqData.verifyKey)) {
        throw new ErrorCustom(HttpStatus.CONFLICT, 'User with key already exist');
      }

      // create user key otp
      const userKey = Utils.createUserKey(verifyKeyHashed);

      const otpFound: string | null = await Utils.getRedisData(userKey);

      if (otpFound != null) {
        throw new ErrorCustom(HttpStatus.CONFLICT, HttpMessage.CONFLIC);
      }

      // generate 6 digital random number
      let sixDigitalRandomNumber: number;

      if (reqData.purpose == 'dev') {
        sixDigitalRandomNumber = 123456;
        await Utils.setRedisData(userKey, `${sixDigitalRandomNumber}`, 60 * 5);
        return new RegistrateResDto(reqData.verifyKey, 'Send OTP successfully in dev mode');
      } else {
        sixDigitalRandomNumber = Utils.createSixRandomDigitalNumber();
      }

      // save otp into redis
      await Utils.setRedisData(userKey, `${sixDigitalRandomNumber}`, 300);

      //6. send otp
      switch (reqData.verifyType) {
        case 'email': {
          await NodeMailerImplementation.getInstance().sendMail(
            reqData.verifyKey,
            'Ticket4U - Xác thực đăng ký!',
            `Đăng ký thành công! Mã xác minh: ${sixDigitalRandomNumber}`,
          );
          // save otp into mysql
          const newUUIDUser = randomUUID();
          if (
            (await this.authRepo.saveOtp(
              new UserVerificationsEntity({
                id: newUUIDUser,
                otp: String(sixDigitalRandomNumber),
                verificationKey: reqData.verifyKey,
                type: reqData.verifyType,
                isDeleted: 0,
                isVerified: 0,
                keyHash: userKey,
                creatorId: 'system',
                modifierId: 'system',
                deletorId: '',
                createdAt: Date.now(),
                modifiedAt: Date.now(),
                deletedAt: 0,
              }),
            )) !== 1
          ) {
            throw new DatabaseError('Error: save otp into mysql');
          }

          break;
        }
        case 'phone': {
          break;
        }
      }

      //return
      return new RegistrateResDto(reqData.verifyKey, 'Send OTP successfully');
    } catch (error) {
      if (error instanceof ErrorCustom) {
        throw error;
      }
      throw new InternalServerError();
    }
  }
}
