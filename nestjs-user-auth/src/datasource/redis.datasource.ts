/* eslint-disable @typescript-eslint/no-unsafe-argument */
import { logError, logInfo } from '@/libs/winston/logger';
import * as dotenv from 'dotenv';
import { createClient, RedisClientType } from 'redis';

dotenv.config({ path: `${__dirname}/../../dev.env` });

export class RedisDatasource {
  private static instance: RedisDatasource;
  public dataSource: RedisClientType;

  private constructor() {
    this.dataSource = createClient({
      url: `redis://${process.env.REDIS_HOSTNAME || 'localhost'}:${process.env.REDIS_PORT || 6303}`,
    }) as RedisClientType;
  }

  public static getInstance(): RedisDatasource {
    if (!RedisDatasource.instance) {
      RedisDatasource.instance = new RedisDatasource();
    }
    return RedisDatasource.instance;
  }

  public async connect(): Promise<void> {
    try {
      await this.dataSource.connect();
      // console.log('Redis connected');
      logInfo('Redis connected', { isSuscces: this.dataSource.isReady });
    } catch (err) {
      // console.error('Redis connect error:', err);
      logError('Redis connect error:', err);
    }
  }
  public async disconnect(): Promise<void> {
    try {
      await this.dataSource.disconnect();
      logInfo('Redis disconnected', { isSuccess: true });
    } catch (err) {
      console.error('Redis disconnect error:', err);
      logError('Redis disconnect error:', err);
    }
  }
}
