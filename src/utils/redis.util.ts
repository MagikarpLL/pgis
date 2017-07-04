import * as Redis from 'ioredis';
import redisConfig from '../config/redis.config';

const redis = new Redis(redisConfig.connect);

const { host, port, db } = redisConfig.connect;

redis.connect(() => console.log(`redis连接成功 redis://${host}:${port}/${db}`));

export default redis;
