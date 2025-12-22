import { LoginUserReqDto } from '@/internal/auth/application/dto/login.dto';
import { RegistrateReqDto } from '@/internal/auth/application/dto/registrate.dto';
import { UpdateRegistrateUserReqDto } from '@/internal/auth/application/dto/updateRegistratePassword.dto';
import { VerifyRegistrateUserReqDto } from '@/internal/auth/application/dto/verify.dto';
import * as zod from 'zod';

const allowedEmailDomains = ['gmail.com', 'yahoo.com', 'hotmail.com', 'outlook.com'];
const allowedVerifyTypes = ['email', 'phone'];
const allowedPurposes = ['dev', 'prod'];

export const registerNewAccount: zod.ZodType<Omit<RegistrateReqDto, never>> = zod.object({
  verifyKey: zod.string().email({ message: 'Invalid email' }),
  verifyType: zod.enum(allowedVerifyTypes, { message: 'Verify type is just email or phone' }),
  purpose: zod.enum(allowedPurposes, { message: 'Purpose is just dev or prod' }),
});

export const verifyRegistrateNewAccount: zod.ZodType<Omit<VerifyRegistrateUserReqDto, never>> = zod.object({
  otp: zod.string().refine((value) => value.length === 6, { message: 'OTP must be 6 digits' }),
  verifyKey: zod.string().refine(
    (value) => {
      if (value.includes('@')) {
        const domain = value.split('@')[1];
        return allowedEmailDomains.includes(domain);
      } else if (Number(value) > 0 && Number(value) < 14) {
        return true;
      }
    },
    { message: 'Invalid verify key' },
  ),
});

export const updatePasswordRegistrateNewAccout: zod.ZodType<Omit<UpdateRegistrateUserReqDto, never>> = zod.object({
  token: zod.string().nonempty({ message: 'Token is required' }),
  password: zod
    .string()
    .min(8, { message: 'Password must be at least 8 characters' })
    .max(254, { message: 'Password must be less than 254 characters' })
    .nonempty({ message: 'Password is required' }),
  confirmPassword: zod
    .string()
    .min(8, { message: 'Password must be at least 8 characters' })
    .max(254, { message: 'Password must be less than 254 characters' })
    .nonempty({ message: 'Confirm password is required' }),
});

export const loginAccount: zod.ZodType<Omit<LoginUserReqDto, never>> = zod.object({
  email: zod.string().email({ message: 'Invalid email' }),
  password: zod
    .string()
    .min(8, { message: 'Password must be at least 8 characters' })
    .max(254, { message: 'Password must be less than 254 characters' })
    .nonempty({ message: 'Password is required' }),
});
