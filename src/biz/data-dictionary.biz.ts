import UUID from '../utils/uuid.util';
import DATE from '../utils/date.util';
import OBJECT from '../utils/object.util';
import redis from '../utils/redis.util';
import redisConfig from '../config/redis.config';
import { Context } from '../utils/koa.util';

export async function getDictionary(): Promise<object> {
    const data = await redis.hgetall(redisConfig.namespace.dictionary);
    const result = OBJECT.convertHGetAll(data);
    return result;
}

export async function findOneDictionary(id: string) {
    const result = await redis.hget(redisConfig.namespace.dictionary, id);
    return JSON.parse(result);
}

export async function saveDictionary(dictionaryName: string, sql: string, remark: string): Promise<object> {
    let data = {
        id: UUID.genUUID(),
        createTime: DATE.getDateTime(),
        dictionaryName: dictionaryName,
        sql: sql,
        remark: remark
    };
    const result = await redis.hsetnx(redisConfig.namespace.dictionary, data.id, JSON.stringify(data));
    return result;
}

export async function updateDictionary(id: string, dictionaryName: string, sql: string, remark: string) {
    const data = await findOneDictionary(id);
    if (data === null) throw new Error('Not Found');
    data['dictionaryName'] = dictionaryName ? dictionaryName : data.dictionaryName;
    data['sql'] = sql ? sql : data.sql;
    data['remark'] = remark ? remark : data.remark;
    const result = await redis.hset(redisConfig.namespace.dictionary, data.id, JSON.stringify(data))
    return result;
}

export async function deleteDictionary(id: string) {
    const result = await redis.hdel(redisConfig.namespace.dictionary, id);
    return result;
}

