import * as zod from 'zod';

export const updateUserProfileReqDto = zod.object({
  userId: zod.string().max(37, { message: 'UUID maxium length is 36 characters' }),

  nickname: zod
    .string()
    .min(1, { message: 'Nickname must be at least 1 character' })
    .max(50, { message: 'Nickname must be less than 50 characters' })
    .optional(),

  avatar: zod.string().optional(),

  state: zod
    .string()
    .min(2, { message: 'State must be at least 2 characters' })
    .max(2, { message: 'State must be less than 2 characters' })
    .optional(),

  mobile: zod
    .string()
    .min(13, { message: 'Mobile must be at least 13 characters' })
    .max(13, { message: 'Mobile must be less than 13 characters' })
    .optional(),

  gender: zod.string().optional(),

  birthday: zod.coerce
    .date()
    .refine(
      (date) => {
        const today = new Date();
        const birthday = new Date(date);
        if (birthday.getFullYear() >= today.getFullYear()) {
          return false;
        }
      },
      { message: 'Birthday is not valid' },
    )
    .optional(),
});

export const verifyChangePasswordReqDto = zod.object({
  verifyKey: zod.string().nonempty({ message: 'Verify key is required' }),
  otp: zod.string().refine(
    (value) => {
      if (value.length === 6) {
        return true;
      }
      return false;
    },
    { message: 'OTP must be 6 digits' },
  ),
});

export const confirmChangePasswordReqDto = zod.object({
  token: zod.string().nonempty({ message: 'Token is required' }),
  password: zod
    .string()
    .nonempty({ message: 'Password is required' })
    .min(8, { message: 'Password must be at least 8 characters' })
    .max(254, { message: 'Password must be less than 254 characters' }),
  confirmPassword: zod
    .string()
    .nonempty({ message: 'Confirm password is required' })
    .min(8, { message: 'Password must be at least 8 characters' })
    .max(254, { message: 'Password must be less than 254 characters' }),
});
