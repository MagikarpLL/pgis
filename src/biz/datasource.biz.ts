import UUID from '../utils/uuid.util';
import DATE from '../utils/date.util';
import OBJECT from '../utils/object.util';
import redis from '../utils/redis.util';
import redisConfig from '../config/redis.config';
import { Context } from '../utils/koa.util';

export async function getDatasource(): Promise<object> {
    const data = await redis.hgetall(redisConfig.namespace.datasource);
    const result = OBJECT.convertHGetAll(data);
    return result;
}

export async function findOneDatasource(id: string) {
    const result = await redis.hget(redisConfig.namespace.datasource, id);
    return JSON.parse(result);
}

export async function saveDatasource(datasourceName: string, sql: string, remark: string): Promise<object> {
    let data = {
        id: UUID.genUUID(),
        createTime: DATE.getDateTime(),
        datasourceName: datasourceName,
        sql: sql,
        remark: remark
    };
    const result = await redis.hsetnx(redisConfig.namespace.datasource, data.id, JSON.stringify(data));
    return result;
}

export async function updateDatasource(id: string, datasourceName: string, sql: string, remark: string) {
    const data = await findOneDatasource(id);
    if (data === null) throw new Error('Not Found');
    data['datasourceName'] = datasourceName ? datasourceName : data.datasourceName;
    data['sql'] = sql ? sql : data.sql;
    data['remark'] = remark ? remark : data.remark;
    const result = await redis.hset(redisConfig.namespace.datasource, data.id, JSON.stringify(data))
    return result;
}

export async function deleteDatasource(id: string) {
    const result = await redis.hdel(redisConfig.namespace.datasource, id);
    return result;
}

