/* eslint-disable @typescript-eslint/no-unsafe-argument */
import { Logger } from '@nestjs/common';
import { createClient, RedisClientType } from 'redis';

export class RedisDatasource {
  private static instance: RedisDatasource;

  public dataSource: RedisClientType;

  private readonly logger = new Logger(RedisDatasource.name);

  private constructor() {
    this.dataSource = createClient({
      url: `redis://${process.env.REDIS_HOSTNAME || 'localhost'}:${process.env.REDIS_PORT || 6379}`,
    });

    // Redis runtime events
    this.dataSource.on('connect', () => {
      this.logger.log('Redis connecting...');
    });

    this.dataSource.on('ready', () => {
      this.logger.log('Redis ready');
    });

    this.dataSource.on('reconnecting', () => {
      this.logger.warn('Redis reconnecting...');
    });

    this.dataSource.on('error', (error) => {
      this.logger.error('Redis error', error);
    });

    this.dataSource.on('end', () => {
      this.logger.warn('Redis disconnected');
    });
  }

  static getInstance(): RedisDatasource {
    if (!this.instance) {
      this.instance = new RedisDatasource();
    }

    return this.instance;
  }

  async connect(): Promise<void> {
    try {
      if (this.dataSource.isReady) {
        return;
      }

      await this.dataSource.connect();

      // verify actual interaction
      await this.dataSource.ping();

      this.logger.log('Redis connected');
    } catch (error) {
      this.logger.error('Redis connection failed', error instanceof Error ? error.stack : String(error));

      throw error;
    }
  }

  async connectWithRetry(maxRetry = 20, delay = 3000): Promise<void> {
    let retry = 0;

    while (retry < maxRetry) {
      try {
        await this.connect();

        return;
      } catch (error) {
        retry++;

        this.logger.error(`Redis retry ${retry}/${maxRetry}`);

        await new Promise((resolve) => setTimeout(resolve, delay));
      }
    }

    this.logger.error('Redis maximum retry exceeded');
  }

  async disconnect(): Promise<void> {
    try {
      if (this.dataSource.isReady) {
        await this.dataSource.quit();

        this.logger.log('Redis disconnected');
      }
    } catch (error) {
      this.logger.error('Redis disconnect failed', error instanceof Error ? error.stack : String(error));
    }
  }
}
