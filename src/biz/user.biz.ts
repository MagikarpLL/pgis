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
    body = decode(body.value); 
    body = JSON.parse(body);  
    let { username, mpassword } = body;
    const obj: any = await db.query(`SELECT * from tb_usr where usrname='${username}'`);
    let jsobj = JSON.parse(obj.result);
    let password: string;
    try {
        password = String(jsobj[0].USRPASSWORD);
    } catch (e) {
        throw "User not registered.Regsiter before u login.";
    }
    if (password === mpassword) return encode(jsobj[0].USRID);
    else return "wrong password";

}
//注册
export async function register(body: any, db: any): Promise<string> {

    body = decode(body.value);
    body = JSON.parse(body);
    let { userName, userPassword } = body;
    let uuid = UUID.genUUID().substring(0, 7);
    let createDate = Date.getDate();
    const result = await db.edit(`INSERT INTO tb_usr values ('${uuid}','${userName}','${userPassword}',to_date('${createDate}','yyyy-mm-dd')，'${uuid}')`);
    auth.addUserRoles(uuid, 'guest');
    return result;
}
//验证
export async function verify(id: string, resoucres: any) {
    let result = [];
    id = decode(id);
    //console.log(await auth.isAllowed(id, resoucres, ['insert', 'delete', 'update']));
    result.push(await auth.isAllowed(id, resoucres, 'insert'));
    result.push(await auth.isAllowed(id, resoucres, 'delete'));
    result.push(await auth.isAllowed(id, resoucres, 'update'));
    result.push(await auth.isAllowed(id, '*', '*'));
    return result;
}

//添加用户角色
export async function addUserRoles(id: string, roles: any) {
    await auth.addUserRoles(id, roles);
}
//删除用户角色
export async function removeUserRoles(id: string, roles: any) {
    await auth.removeUserRoles(id, roles);
}

//获取整表
export async function getAllUsers(tableName: string, db: any): Promise<any> {
    let sql: string;
    sql = `SELECT usrname,usrid FROM ${tableName}`;
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
//更新
export async function update(body: any, sql: SQL, tableName: string, primaryKey: string, primaryKeyValue: string, db: any): Promise<any> {
    let sqlstr: string;
    let { updateUsrId } = body;
    if (updateUsrId == undefined) {
        throw "Missing updateUsrId , check input";
    }
    sqlstr = sql.update(tableName, body, primaryKey, primaryKeyValue);
    const result = await db.edit(sqlstr);
}
//删除
export async function remove(db: any, primaryKey: string, sql: SQL): Promise<any> {
    let sqlstr = sql.delete('tb_usr', 'usrId', decode(primaryKey));
    const result = await db.edit(sqlstr);
    return result;
}