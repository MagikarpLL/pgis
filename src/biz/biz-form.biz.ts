import UUID from '../utils/uuid.util';
import DATE from '../utils/date.util';
import OBJECT from '../utils/object.util';
import redis from '../utils/redis.util';
import redisConfig from '../config/redis.config';

export async function getBizFormList(): Promise<any> {
    const data = await redis.hgetall(redisConfig.namespace.bizform);
    const result = OBJECT.convertHGetAll(data);
    return result;
}

export async function getBizFormInfo(id: string): Promise<any> {
    const result = await redis.hget(redisConfig.namespace.bizform, id);
    return JSON.parse(result);
}

export async function addBizForm(name: string, remark: string, controls: any): Promise<any> {
    const data = {
        id: UUID.genUUID(),
        name: name,
        createTime: DATE.getDateTime(),
        version: '1',
        tableName: 'test',
        remark: remark,
        controls: controls
    }
    const result = await redis.hsetnx(redisConfig.namespace.bizform, data.id, JSON.stringify(data));
    return result;
}

export async function updateBizForm(id: string, name: string, remark: string, controls: any): Promise<any> {
    const data = await getBizFormInfo(id);
    if (data === null) throw new Error('Not Found');
    data['name'] = name ? name : data.name;
    data['remark'] = remark ? remark : data.remark;
    data['controls'] = controls ? controls : data.controls;
    data['version'] += 1;
    const result = await redis.hset(redisConfig.namespace.bizform, data.id, JSON.stringify(data))
    return result;
}

export async function deleteBizForm(id: string): Promise<any> {
    const result = await redis.hdel(redisConfig.namespace.bizform, id);
    return result;
}