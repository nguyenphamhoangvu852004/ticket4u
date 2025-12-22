import { logError, logInfo } from '@/libs/winston/logger';
import { Eureka } from 'eureka-js-client';

export const eurekaClient = new Eureka({
  instance: {
    app: 'auth-user-service',
    hostName: 'nestjs-auth-user-service',
    ipAddr: 'nestjs-auth-user-service',
    port: {
      $: Number(process.env.APP_PORT) || 8087,
      '@enabled': true,
    },
    vipAddress: 'auth-user-service',
    dataCenterInfo: {
      '@class': 'com.netflix.appinfo.InstanceInfo$DefaultDataCenterInfo',
      name: 'MyOwn',
    },
  },
  eureka: {
    host: process.env.EUREKA_SERVER_HOSTNAME || 'localhost', // host của Eureka server
    port: Number(process.env.EUREKA_SERVER_PORT) || 8761, // port của Eureka server
    servicePath: '/eureka/apps/',
  },
});

export function startEurekaClient() {
  try {
    eurekaClient.start();
    logInfo('Eureka client started', { isSuccess: true });
  } catch (error) {
    console.error('Eureka client start error:', error);
    logError('Eureka client start error:', error);
  }
}

export function stopEurekaClient() {
  try {
    eurekaClient.stop();
    logInfo('Eureka client stopped', { isSuccess: true });
  } catch (error) {
    console.error('Eureka client stop error:', error);
    logError('Eureka client stop error:', error);
  }
}
