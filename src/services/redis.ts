import { Module } from '@nestjs/common';
import Redis from 'ioredis';

const RedisConfig = {
  provide: 'REDIS_CLIENT',
  useValue: new Redis({
    host: '127.0.0.1',
    port: 6379,
  }),
};
@Module({
  providers: [RedisConfig],
  exports: ['REDIS_CLIENT'],
})
export class RedisModule {}
