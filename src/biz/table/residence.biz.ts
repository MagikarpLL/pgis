import { DBType } from "../../utils/db.util";
import { Context } from '../../utils/koa.util';
import Date from '../../utils/date.util';
import { SQL } from '../../utils/sql.util';
import OBJECT from '../../utils/object.util';

//tb_residence
//insert
export async function insert(body: any, db: any, sql: SQL): Promise<any> {
    let sqlstr: string;
    let createTime = Date.getDate();
    let { houseHoldId, roomId, registerUnit, localatTribute, registrant, registerDate,
        houseHolderName, houseHolderId, housingArea, housingCategory, familyPlanningCategory,
        phone, postcode, updateUsrId,
 } = body;
    const data = {
        houseHoldId: houseHoldId,
        roomId: roomId,
        registerUnit: registerUnit,
        localatTribute: localatTribute,
        registrant: registrant,
        registerDate:  `to_date('${registerDate}','yyyy-mm-dd')`,
        houseHolderName: houseHolderName,
        houseHolderId: houseHolderId,
        housingArea: housingArea,
        housingCategory: housingCategory,
        familyPlanningCategory: familyPlanningCategory,
        phone: phone,
        postcode: postcode,
        updateUsrId: updateUsrId,
        updateTime:  `to_date('${createTime}','yyyy-mm-dd')`
    }
    sqlstr = sql.insert('tb_residence', data);
    const result = db.edit(sqlstr);
    return result;
}

//tb_residence
//houseHoldId
//delete
export async function remove(db: any, primaryKey: string, sql: SQL): Promise<any> {
    let sqlstr = sql.delete('tb_residence', 'houseHoldId', primaryKey);
    const result = await db.edit(sqlstr);
    return result;
}

//获取整表
export async function getWholeTable(tableName: string, db: any): Promise<any> {
    let sql: string;
    switch (db.dbType) {
        case DBType.MYSQL:
            sql = `SELECT * FROM ${tableName}`;
            break;
        case DBType.ORACLE:
            sql = `SELECT * FROM ${tableName}`;
            break;
        default:
            throw new Error('DB not found!');
    }
    const result = await db.query(sql);
    const jsObj = JSON.parse(result.result);
    return jsObj;
}

//获取单条数据
export async function findOneInDatabase(tableName: string, primaryKeyName: string, primaryKeyValue: string, db: any) {
    let sql: string;
    switch (db.dbType) {
        case DBType.MYSQL:
            sql = `SELECT * FROM ${tableName} WHERE ${primaryKeyName} = '${primaryKeyValue}'`;
            break;
        case DBType.ORACLE:
            sql = `SELECT * FROM ${tableName}WHERE ${primaryKeyName} = '${primaryKeyValue}'`;
            break;
        default:
            throw new Error('DB not found!');
    }
    const result = await db.query(sql);
    const jsObj = JSON.parse(result.result);
    return jsObj[0];
}

//更新
export async function update(body: any, sql: SQL, tableName: string, primaryKey: string, primaryKeyValue: string, db: any): Promise<any> {
    let sqlstr: string;
    sqlstr = sql.update(tableName, body, primaryKey, primaryKeyValue);
    const result = await db.edit(sqlstr);
}

//多参数查询
export async function multiSelect(tableName: string, body: any, sql: SQL, db: any) {
    let sqlstr = sql.multiSelect(tableName, body);
    const result = await db.query(sqlstr);
    const jsObj = JSON.parse(result.result);
    return jsObj;
}




