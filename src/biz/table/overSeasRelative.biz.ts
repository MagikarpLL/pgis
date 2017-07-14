import { DBType } from "../../utils/db.util";
import { Context } from '../../utils/koa.util';
import Date from '../../utils/date.util';
import { SQL } from '../../utils/sql.util';
import OBJECT from '../../utils/object.util'

//tb_overSeasRelative
//insert
export async function insert(body: any, db: any, sql: SQL): Promise<any> {
    let sqlstr: string;
    let createTime = Date.getDateTime();
    let { residenceId, name, gender, ethnicity, birthday, educationalDegree, politicalStatus, maritalStatus, contactInfo,
        relationToHouseHolder, residentialAddress, updateUsrId, updateTime
 } = body;
    const data = {
        residenceId: residenceId,
        name: name,
        gender: gender,
        ethnicity: ethnicity,
        birthday: birthday,
        educationalDegree: educationalDegree,
        politicalStatus: politicalStatus,
        maritalStatus: maritalStatus,
        contactInfo: contactInfo,
        relationToHouseHolder: relationToHouseHolder,
        residentialAddress: residentialAddress,
        updateUsrId: updateUsrId,
        updateTime: createTime,
    }
    sqlstr = sql.insert('tb_overSeasRelative', data);
    const result = db.edit(sqlstr);
    return result;
}

//tb_overSeasRelative
//residenceId
//delete
export async function remove(db: any, primaryKey: string, sql: SQL): Promise<any> {
    let sqlstr = sql.delete('tb_overSeasRelative', 'residenceId', primaryKey);
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





