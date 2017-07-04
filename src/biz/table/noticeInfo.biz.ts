import { DBType } from "../../utils/db.util";
import { Context } from '../../utils/koa.util';
import UUID from "../../utils/uuid.util";
import Date from '../../utils/date.util';

//notice_info
//create
export async function insert(body: any, db: any): Promise<any> {
    let sql: string;
    let uuid = UUID.genUUID();
    let createTime = Date.getDateTime();
    switch (db.dbType) {
        case DBType.MYSQL:
            let { areaNo, content, empidCreate, empidUpdate, overdueTime, publishTime, status, title } = body;
            sql = `INSERT INTO notice_info values ('${uuid}','${areaNo}','${content}','${createTime}','${empidCreate}','${empidUpdate}','${overdueTime}','${publishTime}'
            ,'${status}','${title}','${createTime}','${createTime}')`;
            break;
        case DBType.ORACLE:
            sql = `SELECT * FROM notice_info`;
            break;
        default:
            throw new Error('DB not found!');
    }
    const result = await db.edit(sql);
    return result;
}

//notice_info
//id_
//delete
export async function remove(db: any, primaryKey: string): Promise<any> {
    let sql: string;
    sql = `DELETE FROM notice_info WHERE id_ = '${primaryKey}'`;
    const result = await db.edit(sql);
    return result;

}




