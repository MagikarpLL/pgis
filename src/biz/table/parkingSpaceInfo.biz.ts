import { DBType } from "../../utils/db.util";
import { Context } from '../../utils/koa.util';
import UUID from "../../utils/uuid.util";
import Date from '../../utils/date.util';
import { SQL } from '../../utils/sql.util';
import OBJECT from '../../utils/object.util'

//parking_space_info
//以后统一使用这种写法
//insert
export async function insert(body: any, db: any, sql: SQL): Promise<any> {
    let sqlstr: string;
    let uuid = UUID.genUUID();
    let createTime = Date.getDateTime();
    let { address, areaName, carNo, empidCreate, type, useBeginTime, useStopTime, status } = body;
    const data = {
        id: uuid,
        address: address,
        areaName: areaName,
        carNo: carNo,
        empidCreate: empidCreate,
        empidUpdate: empidCreate,
        status: status,
        tmCreate: createTime,
        tmUpdate: createTime,
        type: type,
        useBeginTime: useBeginTime,
        useStopTime: useStopTime
    }
    sqlstr = sql.insert('parking_space_info', OBJECT.toKeyLine(data));
    const result = db.edit(sqlstr);
    return result;
}

//parking_space_info
//id_
//delete
export async function remove(db: any, primaryKey: string, sql: SQL): Promise<any> {
    let sqlstr = sql.delete('parking_space_info', 'id_', primaryKey);
    const result = await db.edit(sqlstr);
    return result;
}




