import { DBType } from "../../utils/db.util";
import { Context } from '../../utils/koa.util';
import UUID from "../../utils/uuid.util";
import Date from '../../utils/date.util';


//work_log
//create
export async function insert(body: any, db: any): Promise<any> {
    let sql: string;
    let uuid = UUID.genUUID();
    let createTime = Date.getDateTime();
    switch (db.dbType) {
        case DBType.MYSQL:
            let { content, empidCreate, status, time, title, type } = body;
            sql = `INSERT INTO work_log values ('${uuid}','${content}','${empidCreate}','${empidCreate}','${status}','${time}',
                    '${createTime}','${createTime}','${type}')`;
            break;
        case DBType.ORACLE:
            sql = `SELECT * FROM work_log`;
            break;
        default:
            throw new Error('DB not found!');
    }
    const result = await db.edit(sql);
    return result;
}

//work_log
//id_
//delete
export async function remove(db: any, primaryKey: string): Promise<any> {
    let sql: string;
    sql = `DELETE FROM work_log WHERE id_ = '${primaryKey}'`;
    const result = await db.edit(sql);
    return result;

}



