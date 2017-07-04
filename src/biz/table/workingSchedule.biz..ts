import { DBType } from "../../utils/db.util";
import { Context } from '../../utils/koa.util';
import UUID from "../../utils/uuid.util";
import Date from '../../utils/date.util';

//working_schedule_info
//insert
export async function insert(body: any, db: any): Promise<any> {
    let sql: string;
    let uuid = UUID.genUUID();
    let createTime = Date.getDateTime();
    switch (db.dbType) {
        case DBType.MYSQL:
            let { beginTime, chargePerson, empidCreate, stopTime, type, workingDescription, workingPositionId, status } = body;
            sql = `INSERT INTO working_schedule_info values ('${uuid}','${beginTime}','${chargePerson}','${empidCreate}','${empidCreate}','${status}','${stopTime}',
                    ,'${createTime}','${createTime}','${type}','${workingDescription}','${workingPositionId}')`;
            break;
        case DBType.ORACLE:
            sql = `SELECT * FROM working_schedule_info`;
            break;
        default:
            throw new Error('DB not found!');
    }
    const result = await db.edit(sql);
    return result;
}

//working_schedule_info
//id_
//delete
export async function remove(db: any, primaryKey: string): Promise<any> {
    let sql: string;
    sql = `DELETE FROM working_schedule_info WHERE id_ = '${primaryKey}'`;
    const result = await db.edit(sql);
    return result;
}




