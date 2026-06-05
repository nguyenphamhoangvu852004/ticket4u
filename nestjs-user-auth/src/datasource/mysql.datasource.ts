/* eslint-disable no-useless-catch */
import { DataSource } from 'typeorm';
import { Logger } from '@nestjs/common';
import { v4 as uuid } from 'uuid';

import { permissionsMockData, rolesMockData, rolesPermissionsMockData } from 'mockData/mockData';

import { UserModelSchema } from '@/internal/user/infrastructure/model/user.model';

import { UserProfileGenderEnum, UserProfilesModelChema } from '@/internal/user/infrastructure/model/userProfiles.model';

import { Utils } from '@/utils/utils';

export class MySQLDatasource {
  private static instance: MySQLDatasource;

  public dataSource: DataSource;

  private readonly logger = new Logger(MySQLDatasource.name);

  private constructor() {
    this.dataSource = new DataSource({
      type: 'mysql',
      host: process.env.DB_HOSTNAME,
      port: Number(process.env.DB_PORT),
      username: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME,

      entities: [__dirname + '/../**/*.model.{ts,js}', __dirname + '/../libs/typeorm/baseModelSchema.{ts,js}'],

      synchronize: process.env.DB_SYNCH === 'true',

      logging: process.env.DB_LOGGING === 'true',
    });
  }

  static getInstance(): MySQLDatasource {
    if (!this.instance) {
      this.instance = new MySQLDatasource();
    }

    return this.instance;
  }

  async connect() {
    try {
      if (this.dataSource.isInitialized) {
        return;
      }

      await this.dataSource.initialize();

      // Verify actual DB interaction
      await this.dataSource.query('SELECT 1');

      this.logger.log('MySQL connected');
    } catch (error) {
      this.logger.error('DB connection failed', error instanceof Error ? error.stack : String(error));

      throw error;
    }
  }

  async initializeData() {
    try {
      const rolesRepo = this.dataSource.getRepository('roles');

      const permissionsRepo = this.dataSource.getRepository('permissions');

      const rolePermissionsRepo = this.dataSource.getRepository('role_permissions');

      if (!(await rolesRepo.count())) {
        await rolesRepo.insert(rolesMockData);
      }

      if (!(await permissionsRepo.count())) {
        await permissionsRepo.insert(permissionsMockData);
      }

      if (!(await rolePermissionsRepo.count())) {
        await rolePermissionsRepo.insert(rolesPermissionsMockData);
      }

      const userRepo = this.dataSource.getRepository(UserModelSchema);

      const admin = await userRepo.findOne({
        where: {
          account: 'admin@gmail.com',
        },
      });

      if (!admin) {
        const adminId = uuid();

        await userRepo.insert({
          id: adminId,
          account: 'admin@gmail.com',

          password: await Utils.hashStringUsingBcryptJS('123456789Admin!', 12),

          loginIp: '127.0.0.1',

          loginTime: 0,

          createdAt: Date.now(),

          modifiedAt: Date.now(),

          deletedAt: 0,

          creatorId: adminId,

          modifierId: adminId,

          deletorId: '',
        });

        const adminRole = rolesMockData.find((x) => x.name === 'ADMIN');

        if (adminRole) {
          await this.dataSource.getRepository('user_roles').insert({
            user_id: adminId,

            role_id: adminRole.id,
          });
        }

        await this.dataSource.getRepository(UserProfilesModelChema).insert({
          id: uuid(),

          account: 'admin@gmail.com',

          avatar: '',

          birthday: new Date(),

          email: 'admin@gmail.com',

          gender: UserProfileGenderEnum.FEMALE,

          isAuthenticated: 1,

          mobile: '0987654321',

          nickname: 'admin',

          state: 'VN',

          createdAt: Date.now(),

          modifiedAt: Date.now(),

          deletedAt: 0,

          creatorId: adminId,

          modifierId: adminId,

          deletorId: '',
        });
      }

      this.logger.log('Initial data seeded');
    } catch (error) {
      throw error;
    }
  }

  async connectDatabaseWithRetry(maxRetry = 20, delay = 3000) {
    let retry = 0;

    while (retry < maxRetry) {
      try {
        await this.connect();

        await this.initializeData();

        return;
      } catch (error) {
        retry++;

        this.logger.error(`Retry ${retry}/${maxRetry}`);

        await new Promise((resolve) => setTimeout(resolve, delay));
      }
    }

    this.logger.error('Maximum retry count exceeded');
  }

  async disconnect() {
    try {
      if (this.dataSource.isInitialized) {
        await this.dataSource.destroy();

        this.logger.log('MySQL disconnected');
      }
    } catch (error) {
      this.logger.error('Disconnect failed');
    }
  }
}
