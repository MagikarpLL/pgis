import { DBType } from "../../utils/db.util";
import { Context } from '../../utils/koa.util';
import UUID from "../../utils/uuid.util";
import Date from '../../utils/date.util';


//suggestion_info
//create
export async function insert(body: any, db: any): Promise<any> {
    let sql: string;
    let uuid = UUID.genUUID();
    let createTime = Date.getDateTime();
    switch (db.dbType) {
        case DBType.MYSQL:
            let { content, empidCreate, householderId, means, processDate, type,registerTime,solution,status } = body;
            sql = `INSERT INTO suggestion_info values ('${uuid}','${content}','${empidCreate}','${empidCreate}','${householderId}','${means}',
                    '${processDate}','${registerTime}','${solution}','${status}','${createTime}','${createTime}','${type}')`;
            break;
        case DBType.ORACLE:
            sql = `SELECT * FROM suggestion_info`;
            break;
        default:
            throw new Error('DB not found!');
    }
    const result = await db.edit(sql);
    return result;
}

//suggestion_info
//id_
//delete
export async function remove(db: any, primaryKey: string): Promise<any> {
    let sql: string;
    sql = `DELETE FROM suggestion_info WHERE id_ = '${primaryKey}'`;
    const result = await db.edit(sql);
    return result;

}



