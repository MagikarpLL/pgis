import Date from '../utils/date.util';
import UUID from "../utils/uuid.util";
import { Context } from '../utils/koa.util';
import auth from '../utils/auth.util';
import { encode, decode } from '../utils/crypto.util';
import { DBType } from "../utils/db.util";
import { SQL } from "../utils/sql.util"
//修改用户类型
export async function modifyUserRole(id: string, oldRoles: any, newRoles: any) {
    auth.removeUserRoles(id, oldRoles);
    auth.addUserRoles(id, newRoles);
}
//登录
export async function login(db: any, body: any): Promise<string> {
    body = decode(body);
    let { username, mpassword } = body;
    const obj: any = await db.query(`SELECT * from tb_usr where username='${username}'`);
    let jsobj = JSON.parse(obj.result);
    let password = String(jsobj[0].userPassword);
    if (password == mpassword) return jsobj[0].userId;
    else return "wrong password";

}
//注册
export async function register(body: any, db: any): Promise<string> {
    body = decode(body);
    let { userName, userPassword } = body;
    let uuid = UUID.genUUID();
    let createDate = Date.getDate();
    const result = await db.edit(`INSERT INTO tb_usr values ('${uuid}','${userName}','${userPassword}',to_date('${createDate}','yyyy-mm-dd')，'${uuid}')`);
    auth.addUserRoles(uuid, 'guest');
    return result;
}
//验证
export async function verify(id: string, resoucres: any, perimissions: any) {
    return auth.isAllowed(id, resoucres, perimissions);
}

//添加用户角色
export async function addUserRoles(id: string, roles: any) {
    auth.addUserRoles(id, roles);
}
//删除用户角色
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

    let sql = `SELECT * FROM ${tableName} WHERE ${primaryKeyName} = '${primaryKeyValue}'`;
    const result = await db.query(sql);
    const jsObj = JSON.parse(result.result);
    return jsObj[0];
}

