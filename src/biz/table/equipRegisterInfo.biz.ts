import { DBType } from "../../utils/db.util";
import { Context } from '../../utils/koa.util';
import UUID from "../../utils/uuid.util";
import Date from '../../utils/date.util';



//equip_register_info
//create
export async function insert(body: any, db: any): Promise<any> {
    let sql: string;
    let uuid = UUID.genUUID();
    let createTime = Date.getDateTime();
    switch (db.dbType) {
        case DBType.MYSQL:
            let { empidCreate, name, note, providerName, registerTime, repairmentInCharge, status, typeNo, useLimit } = body;
            sql = `INSERT INTO equip_register_info values ('${uuid}','${empidCreate}','${empidCreate}','${name}','${note}','${providerName}',
                    '${registerTime}','${repairmentInCharge}','${status}',
                    ,'${createTime}','${createTime}','${typeNo}','${useLimit}')`;
            break;
        case DBType.ORACLE:
            sql = `SELECT * FROM equip_register_info`;
            break;
        default:
            throw new Error('DB not found!');
    }
    const result = await db.edit(sql);
    return result;
}

//equip_register_info
//id_
//delete
export async function remove(db: any, primaryKey: string): Promise<any> {
    let sql: string;
    sql = `DELETE FROM equip_register_info WHERE id_ = '${primaryKey}'`;
    const result = await db.edit(sql);
    return result;

}



