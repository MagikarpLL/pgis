import { Grpc } from "../utils/grpc.util";
import redis from '../utils/redis.util';
import Date from '../utils/date.util';
import { DB } from "../utils/db.util";
import UUID from "../utils/uuid.util";
import { Context } from '../utils/koa.util';


export async function login(db: any, mName: string, mPass: string): Promise<string> {
    const obj:any =await db.query(`SELECT * from user_info where user_name_='${mName}'`);
    let jsobj=JSON.parse(obj.result);
    let password=String(jsobj[0].user_pass_);
    console.log(password,jsobj[0].user_pass_);
    if (password==mPass) return jsobj[0].user_type_;
    else return "wrong password";

}

export async function register(body: any, db: any): Promise<string> {
    let { userName, userNickName, userPass, sex, tel, idCard, userType, status } = body;
    let uuid = UUID.genUUID();
    let createId = uuid;
    let createTime = Date.getDateTime();
    const result = await db.edit(`INSERT INTO user_info values ('${uuid}','${createId}','${createId}','${idCard}','${sex}','${status}','${tel}','${createTime}','${createTime}','${userName}','${userNickName}','${userType}','${userPass}')`);
    return result;
}

