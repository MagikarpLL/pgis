import { DBType } from "../../utils/db.util";
import { Context } from '../../utils/koa.util';
import UUID from "../../utils/uuid.util";
import Date from '../../utils/date.util';


//property_basic_info
//insert
export async function insert(body: any, db: any): Promise<any> {
    let sql: string;
    let uuid = UUID.genUUID();
    let createTime = Date.getDateTime();
    switch (db.dbType) {
        case DBType.MYSQL:
            let { empidCreate, communityName, address, propertyType, propertyArea, certificateNo, useLimit, owner, user, idCardScan, certificateScan, other, status } = body;
            sql = `INSERT INTO property_basic_info values ('${uuid}','${address}','${certificateNo}','${certificateScan}','${communityName}','${empidCreate}','${empidCreate}','${idCardScan}','${other}','${owner}',
                    '${propertyArea}','${propertyType}','${status}','${createTime}','${createTime}','${useLimit}','${user}')`;
            break;
        case DBType.ORACLE:
            sql = `SELECT * FROM property_basic_info`;
            break;
        default:
            throw new Error('DB not found!');
    }
    const result = await db.edit(sql);
    return result;
}

//property_basic_info
//property_id_
//delete
export async function remove(db: any, primaryKey: string): Promise<any> {
    let sql: string;
    sql = `DELETE FROM property_basic_info WHERE property_id_ = '${primaryKey}'`;
    const result = await db.edit(sql);
    return result;
}




