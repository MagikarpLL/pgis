import redis from '../utils/redis.util';
import Date from '../utils/date.util';
import UUID from "../utils/uuid.util";
import { Context } from '../utils/koa.util';
import auth from '../utils/auth.util';

export async function modifyUserRole(id: string, oldRoles: any, newRoles: any) {
    auth.removeUserRoles(id, oldRoles);
    auth.addUserRoles(id, newRoles);
}

export async function login(db: any, mName: string, mPass: string): Promise<string> {
    const obj: any = await db.query(`SELECT * from user_info where user_name_='${mName}'`);
    let jsobj = JSON.parse(obj.result);
    let password = String(jsobj[0].user_pass_);
    if (password == mPass) return auth.userRoles(jsobj[0].userId);
    else return "wrong password";

}

export async function register(body: any, db: any): Promise<string> {
    let { userName, userNickName, userPass, sex, tel, idCard, userType, status } = body;
    let uuid = UUID.genUUID();
    let createId = uuid;
    let createTime = Date.getDateTime();
    const result = await db.edit(`INSERT INTO user_info values ('${uuid}','${createId}','${createId}','${idCard}',
    '${sex}','${status}','${tel}','${createTime}','${createTime}','${userName}','${userNickName}','${userType}','${userPass}')`);
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

