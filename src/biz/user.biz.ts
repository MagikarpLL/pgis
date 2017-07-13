import Date from '../utils/date.util';
import UUID from "../utils/uuid.util";
import { Context } from '../utils/koa.util';
import auth from '../utils/auth.util';
import { encode, decode } from '../utils/crypto.util';
import { DBType } from "../utils/db.util";

export async function modifyUserRole(id: string, oldRoles: any, newRoles: any) {
    auth.removeUserRoles(id, oldRoles);
    auth.addUserRoles(id, newRoles);
}

export async function login(db: any, body: any): Promise<string> {
    body = decode(body);
    let { username, mpassword } = body;
    const obj: any = await db.query(`SELECT * from tb_user where username='${username}'`);
    let jsobj = JSON.parse(obj.result);
    let password = String(jsobj[0].userPassword);
    if (password == mpassword) return jsobj[0].userId;
    else return "wrong password";

}

export async function register(body: any, db: any): Promise<string> {
    body = decode(body);
    let { userName, userPassword, updateUserId } = body;
    let uuid = UUID.genUUID();
    let createId = uuid;
    let createDate = Date.getDate();
    const result = await db.edit(`INSERT INTO tb_user values ('${uuid}','${userName}','${userPassword}','${createDate}'，'${updateUserId}')`);
    auth.addUserRoles(uuid, 'guest');
    return result;
}

export async function verify(id: string, resoucres: any, perimissions: any) {
    return auth.isAllowed(id, resoucres, perimissions);
}


export async function addUserRoles(id: string, roles: any) {
    auth.addUserRoles(id, roles);
}

export async function removeUserRoles(id: string, roles: any) {
    auth.removeUserRoles(id, roles);
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
