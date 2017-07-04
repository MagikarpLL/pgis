import { DBType } from "../../utils/db.util";
import { Context } from '../../utils/koa.util';
import UUID from "../../utils/uuid.util";
import Date from '../../utils/date.util';

//working_position_info
//insert
export async function insert(body: any, db: any): Promise<any> {
    let sql: string;
    let uuid = UUID.genUUID();
    let createTime = Date.getDateTime();
    switch (db.dbType) {
        case DBType.MYSQL:
            let { type, communityAreaName, description, empidCreate, status } = body;
            sql = `INSERT INTO working_position_info values ('${uuid}','${communityAreaName}','${description}','${empidCreate}','${empidCreate}','${status}',
                    ,'${createTime}','${createTime}','${type}')`;
            break;
        case DBType.ORACLE:
            sql = `SELECT * FROM working_position_info`;
            break;
        default:
            throw new Error('DB not found!');
    }
    const result = await db.edit(sql);
    return result;
}

//working_position_info
//id_
//delete
export async function remove(db: any, primaryKey: string): Promise<any> {
    let sql: string;
    sql = `DELETE FROM working_position_info WHERE id_ = '${primaryKey}'`;
    const result = await db.edit(sql);
    return result;
}




