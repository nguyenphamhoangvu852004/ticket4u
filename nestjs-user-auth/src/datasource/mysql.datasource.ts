import { DataSource } from 'typeorm';
import * as mysql from 'mysql2/promise';
import { logError, logInfo } from '@/libs/winston/logger';
import { permissionsMockData, rolesMockData, rolesPermissionsMockData } from '@/mockData/mockData';
import { UserModelSchema } from '@/internal/user/infrastructure/model/user.model';
import { Utils } from '@/utils/utils';
import { v4 as uuid } from 'uuid';
import { UserProfileGenderEnum, UserProfilesModelChema } from '@/internal/user/infrastructure/model/userProfiles.model';

export class MysqlDatasource {
  private static instance: MysqlDatasource;
  public dataSource: DataSource;

  private constructor() {
    this.dataSource = new DataSource({
      type: 'mysql',
      host: process.env.DB_HOSTNAME || 'localhost',
      port: Number(process.env.DB_PORT) || 3303,
      username: process.env.DB_USER || 'root',
      password: process.env.DB_PASSWORD || 'shopdev',
      database: process.env.DB_NAME || 'ticket4u_test',
      entities: [__dirname + '/../**/*.model.{ts,js}', __dirname + '/../libs/typeorm/baseModelSchema.{ts,js}'],
      synchronize: process.env.DB_SYNCH === 'true',
      logging: process.env.DB_LOGGING === 'true',
    });
  }

  public static getInstance(): MysqlDatasource {
    if (!MysqlDatasource.instance) {
      MysqlDatasource.instance = new MysqlDatasource();
    }
    return MysqlDatasource.instance;
  }

  async connect() {
    try {
      // Tạo DB nếu chưa tồn tại
      const conn = await mysql.createConnection({
        host: process.env.DB_HOSTNAME as string,
        port: Number(process.env.DB_PORT),
        user: process.env.DB_USER as string,
        password: process.env.DB_PASSWORD as string,
      });
      await conn.query(`CREATE DATABASE IF NOT EXISTS ${process.env.DB_NAME as string}`);
      await conn.end();

      // Kết nối TypeORM
      await this.dataSource.initialize();

      const roles = await this.dataSource.getRepository('roles').find();
      if (roles.length === 0) {
        await this.dataSource.getRepository('roles').insert(rolesMockData);
      }

      const permissions = await this.dataSource.getRepository('permissions').find();
      if (permissions.length === 0) {
        await this.dataSource.getRepository('permissions').insert(permissionsMockData);
      }

      // update roles_permissions table
      const rolesPermissions = await this.dataSource.getRepository('role_permissions').find();
      if (rolesPermissions.length === 0) {
        await this.dataSource.getRepository('role_permissions').clear();
        await this.dataSource.getRepository('role_permissions').insert(rolesPermissionsMockData);
      }

      // if not exist ADMIN account then create ADMIN account
      const adminAccount = await this.dataSource.getRepository(UserModelSchema).findOne({
        where: {
          account: 'admin@gmail.com',
        },
      });
      if (!adminAccount) {
        const adminUUID = uuid();
        // tạo row user
        await this.dataSource.getRepository(UserModelSchema).insert({
          id: adminUUID,
          account: 'admin@gmail.com',
          password: await Utils.hashStringUsingBcryptJS('123456789Admin!', 12),
          loginIp: '127.0.0.1',
          loginTime: 0,
          createdAt: new Date().getUTCMilliseconds(),
          modifiedAt: new Date().getUTCMilliseconds(),
          deletedAt: 0,
          creatorId: adminUUID,
          deletorId: '',
          modifierId: adminUUID,
        });
        // thêm vai trò
        await this.dataSource.getRepository('user_roles').insert({
          user_id: adminUUID,
          role_id: Array.from(rolesMockData).filter((role) => {
            return role.name === 'ADMIN';
          })[0].id,
        });
        // tạo profile
        await this.dataSource.getRepository(UserProfilesModelChema).insert({
          id: uuid(),
          account: 'admin@gmail.com',
          avatar: 'testting//....com',
          birthday: new Date(),
          email: 'admin@gmail.com',
          gender: UserProfileGenderEnum.FEMALE,
          isAuthenticated: 1,
          mobile: '0987654321',
          nickname: 'admin',
          state: 'VN',
          createdAt: new Date().getUTCMilliseconds(),
          modifiedAt: new Date().getUTCMilliseconds(),
          deletedAt: 0,
          creatorId: adminUUID,
          deletorId: '',
          modifierId: adminUUID,
        });
      }

      logInfo('MySQL connected', { isSuccess: this.dataSource.isInitialized });
    } catch (err: unknown) {
      const error = err as Error;
      logError('DB connect error:', error);
    }
  }

  async disconnect() {
    try {
      await this.dataSource.destroy();
      logInfo('MySQL disconnected', { isSuccess: true });
    } catch (error) {
      logError('MySQL disconnected error:', error);
    }
  }
}
