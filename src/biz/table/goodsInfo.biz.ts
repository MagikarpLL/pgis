import { DBType } from "../../utils/db.util";
import { Context } from '../../utils/koa.util';
import UUID from "../../utils/uuid.util";
import Date from '../../utils/date.util';



//goods_info
//create
export async function insert(body: any, db: any): Promise<any> {
    let sql: string;
    let uuid = UUID.genUUID();
    let createTime = Date.getDateTime();
    switch (db.dbType) {
        case DBType.MYSQL:
            let { empidCreate, buyPrice, goodsName, downLimit, measurementUnit, presentAmount, provider, sellPirce, status, storageNo, typeNo, upLimit } = body;
            sql = `INSERT INTO goods_info values ('${uuid}','${buyPrice}','${downLimit}','${empidCreate}','${empidCreate}','${goodsName}',
                    '${measurementUnit}','${presentAmount}','${provider}','${sellPirce}','${status}',
                    '${storageNo}','${createTime}','${createTime}','${typeNo}','${upLimit}')`;
            break;
        case DBType.ORACLE:
            sql = `SELECT * FROM goods_info`;
            break;
        default:
            throw new Error('DB not found!');
    }
    const result = await db.edit(sql);
    return result;
}

//goods_info
//goods_no_
//delete
export async function remove(db: any, primaryKey: string): Promise<any> {
    let sql: string;
    sql = `DELETE FROM goods_info WHERE goods_no_ = '${primaryKey}'`;
    const result = await db.edit(sql);
    return result;
}



