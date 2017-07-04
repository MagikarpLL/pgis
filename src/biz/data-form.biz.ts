import UUID from '../utils/uuid.util';
import DATE from '../utils/date.util';
import OBJECT from '../utils/object.util';
import redis from '../utils/redis.util';
import redisConfig from '../config/redis.config';
import { DFTypeChanger } from '../utils/dftype.util';
import * as dbBiz from '../biz/db.biz';

import { Context } from '../utils/koa.util';

const changer = new DFTypeChanger();

export interface IProsColumn {
    name: string;  // 列名
    label: string;
    type: string;  // 类型
    required: boolean;  //是否必填
    default: any;     //默认
    maxlength: number;//最大长度
    _$state_: number; //状态 0不变，1增加，2修改，3删除
    selections: any;//数据源
}

export async function getDataFormList(): Promise<any> {
    const data = await redis.hgetall(redisConfig.namespace.dataform);
    const result = OBJECT.convertHGetAll(data);
    return result;
}

export async function getDataFormInfo(id: string): Promise<any> {
    const result = await redis.hget(redisConfig.namespace.dataform, id);
    return JSON.parse(result);
}

export async function addDataForm(ctx: Context, name: string, remark: string, controls: IProsColumn[]): Promise<any> {

    const dataColumns: any[] = [];

    //加入Id作为主键
    const IdCol: any = {
        fieldName: 'ID_',
        dataType: 'string',
        length: '36',
        defaultValue: null,
        notNull: true,
        primaryKey: true,
        unique: false,
        _$state_: 1
    };

    dataColumns.push(IdCol);

    for (const control of controls) {
        const col = changer.useDFTypeChanger(control);
        dataColumns.push(col);
    }


    const tableName = `mh_data_form_${DATE.getTimestamp()}`;

    const json = await dbBiz.createTable(ctx, tableName, remark, dataColumns);
    // console.log('result:');
    // console.log('aa:'+json);


    const data = {
        id: UUID.genUUID(),
        name: name,
        createTime: DATE.getDateTime(),
        version: '1',
        tableName: tableName,
        remark: remark,
        controls: controls
    }
    const result = await redis.hsetnx(redisConfig.namespace.dataform, data.id, JSON.stringify(data));
    return result;
}

export async function updateDataForm(ctx: Context, id: string, name: string, remark: string, controls: any): Promise<any> {
    const data = await getDataFormInfo(id);
    if (data === null) throw new Error('Not Found');
    data['name'] = name ? name : data.name;
    data['remark'] = remark ? remark : data.remark;
    data['controls'] = controls ? controls : data.controls;
    data['version'] += 1;

    const dataColumns: any[] = [];
    for (const control of controls) {
        const col = changer.useDFTypeChanger(control);
        dataColumns.push(col);
    }


    const json = await dbBiz.alterTable(ctx, data.tableName, dataColumns);
    console.log(json)


    const result = await redis.hset(redisConfig.namespace.dataform, data.id, JSON.stringify(data))
    return result;
}

export async function deleteDataForm(ctx: Context, id: string): Promise<any> {
    // console.log(`${redisConfig.namespace.dataform}:${id}`);
    // console.log(await redis.hget(`${redisConfig.namespace.dataform}:${id}`));
    const tableName = (JSON.parse(await redis.hget(redisConfig.namespace.dataform, id))).tableName;
    console.log('tableName:' + tableName);
    try {
        dbBiz.deleteTable(ctx, tableName);
    } catch (e) {
        // throw new Error(e);
        return new Error(e);
    }

    const result = await redis.hdel(redisConfig.namespace.dataform, id);
    return result;
}