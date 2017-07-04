import { DBType } from "../../utils/db.util";
import { Context } from '../../utils/koa.util';
import UUID from "../../utils/uuid.util";
import Date from '../../utils/date.util';



//archive_info
//create
export async function insert(body: any, db: any): Promise<any> {
    let sql: string;
    let uuid = UUID.genUUID();
    let createTime = Date.getDateTime();
    switch (db.dbType) {
        case DBType.MYSQL:
            let { empidCreate, archiveDesc, archiveName, registerDate, rentDate, returnDate, rollOutDate, status, uploadBy} = body;
            sql = `INSERT INTO archive_info values ('${uuid}','${archiveDesc}','${archiveName}','${empidCreate}','${empidCreate}','${registerDate}',
                    '${rentDate}','${returnDate}','${rollOutDate}','${status}','${createTime}','${createTime}','${uploadBy}')`;
            break;
        case DBType.ORACLE:
            sql = `SELECT * FROM archive_info`;
            break;
        default:
            throw new Error('DB not found!');
    }
    const result = await db.edit(sql);
    return result;
}

//archive_info
//id_
//delete
export async function remove(db: any, primaryKey: string): Promise<any> {
    let sql: string;
    sql = `DELETE FROM archive_info WHERE id_ = '${primaryKey}'`;
    const result = await db.edit(sql);
    return result;
}



