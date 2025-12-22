import * as jwt from 'jsonwebtoken';
import * as dotenv from 'dotenv';
import * as bcryptjs from 'bcryptjs';
import * as crypto from 'crypto';
import { RedisDatasource } from '@/datasource/redis.datasource';
dotenv.config({ path: `${__dirname}/../../dev.env` });

// export class RegistrateNewUserPayload implements jwt.JwtPayload {
//   email: string;
//   constructor(email: string) {
//     this.email = email;
//   }
// }

export class Utils {
  constructor() {}
  public static createSixRandomDigitalNumber(): number {
    return Math.floor(Math.random() * (999999 - 100000 + 1)) + 100000;
  }
  public static generateJWTToken(payload: object, type: 'registrate' | 'login'): string {
    switch (type) {
      case 'registrate': {
        const token = jwt.sign(payload, process.env.JWT_REGISTRATE_NEW_USER_SECRET_STRING as string, {
          expiresIn: Number(process.env.JWT_REGISTRATE_NEW_USER_EXPIRES_IN),
          algorithm: 'HS256',
        });
        return token;
      }
      case 'login': {
        const token = jwt.sign(payload, process.env.JWT_LOGIN_SECRET_STRING as string, {
          expiresIn: Number(process.env.JWT_LOGIN_EXPIRES_IN),
          algorithm: 'HS256',
        });
        return token;
      }
    }
  }
  public static verifyJWTToken<T extends jwt.JwtPayload>(token: string, type: 'registrate' | 'login'): T {
    switch (type) {
      case 'registrate':
        return jwt.verify(token, process.env.JWT_REGISTRATE_NEW_USER_SECRET_STRING as string, {
          algorithms: ['HS256'],
        }) as T;

      case 'login':
        return jwt.verify(token, process.env.JWT_LOGIN_SECRET_STRING as string, { algorithms: ['HS256'] }) as T;
    }
  }

  /**
   * @description -  Lưu dữ liệu vào Redis với thời gian hết hạn
   * @param key - khoá lưu trữ
   * @param value - giá trị lưu trữ
   * @param exp - thời gian hết hạn tính bằng giây
   * @returns {Promise<boolean>} - trả về true nếu lưu thành công, false nếu có lỗi
   */
  public static async setRedisData(key: string, value: string, exp: number): Promise<boolean> {
    try {
      const result = await RedisDatasource.getInstance().dataSource.set(key, value, {
        EX: exp,
      });
      return result === 'OK';
    } catch (err) {
      console.error('[Redis Error] Failed to set key:', key, err);
      return false;
    }
  }

  /**
   * @description - Lấy dữ liệu từ Redis theo khoá
   * @param key - khoá cần lấy dữ liệu
   * @returns {Promise<string | null>}
   */
  public static async getRedisData(key: string): Promise<string | null> {
    try {
      const result = await RedisDatasource.getInstance().dataSource.get(key);
      return result ?? null; // đảm bảo trả null nếu không có
    } catch (err) {
      console.error('[Redis Error] Failed to get key:', key, err);
      return null; // fallback an toàn
    }
  }

  /**
   * @description - Xoá dữ liệu trong Redis theo khoá
   * @param key - khoá cần xoá
   * @returns {Promise<number>}
   */
  public static async deleteRedisData(key: string): Promise<number> {
    try {
      const result = await RedisDatasource.getInstance().dataSource.del(key);
      return result ?? 0; // Redis trả số lượng key bị xóa
    } catch (err) {
      console.error('[Redis Error] Failed to delete key:', key, err);
      return 0; // fallback an toàn
    }
  }

  public static hashString(str: string): string {
    return crypto.createHash('sha256').update(str).digest('hex');
  }

  public static async compareHashString(str: string, hashedString: string): Promise<boolean> {
    try {
      const isMatch = await bcryptjs.compare(str, hashedString);
      return isMatch;
    } catch (error) {
      return error as boolean;
    }
  }

  /**
   * @description Tạo ra user key
   * @param {string} hashKey - verifykey đã được mã hoá
   * @returns {string} - user key dạng u:{hashKey}:otp
   */
  public static createUserKey(hashKey: string): string {
    return `u:${hashKey}:otp`;
  }

  public static generateRamdonUserNickname(): string {
    return `user_${Math.random().toString(36).substring(2, 10)}`;
  }
  public static formatUnixMillis(ms: string | number): string {
    const num = Number(ms); // convert string -> number
    if (isNaN(num)) return 'Invalid Date'; // check tránh NaN

    const date = new Date(num);
    const yyyy = date.getFullYear();
    const mm = String(date.getMonth() + 1).padStart(2, '0');
    const dd = String(date.getDate()).padStart(2, '0');
    const hh = String(date.getHours()).padStart(2, '0');
    const min = String(date.getMinutes()).padStart(2, '0');
    const ss = String(date.getSeconds()).padStart(2, '0');

    return `${yyyy}-${mm}-${dd} ${hh}:${min}:${ss}`;
  }

  /**
   * Convert string (YYYY-MM-DD) → Date
   */
  public static toDate(dateString?: string | null): Date | null {
    if (!dateString) return null;
    const d = new Date(dateString);
    return isNaN(d.getTime()) ? null : d;
  }

  public static generateFromTentoTwelveRandomNumber(): number {
    return Math.floor(Math.random() * (12 - 10 + 1)) + 10;
  }

  public static hashStringUsingBcryptJS(str: string, saltRounds: number): Promise<string> {
    return bcryptjs.hash(str, saltRounds);
  }

  public static async compareHashStringUsingBcryptJS(str: string, hashedString: string): Promise<boolean> {
    try {
      const isMatch = await bcryptjs.compare(str, hashedString);
      return isMatch;
    } catch (error) {
      return error as boolean;
    }
  }
}
