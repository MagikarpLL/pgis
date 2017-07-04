import * as Koa from 'koa';
// 数据库工具类
import { DB } from './db.util';
// SQL工具类
import { SQL } from './sql.util';
// Socket.IO
import * as SocketIO from 'socket.io';

interface Response {
    status: number;
    message: string;
    data: object;
}

export interface Context extends Koa.Context {
    io: SocketIO.Server;
    sql: SQL;
    db: DB;
    success: Function;
    error: Function;
}

export function init(ctx: Context) {
    ctx.success = (data: object, msg?: string) => {
        ctx.body = { status: 1, message: msg, data: data };
    }
    ctx.error = (msg: string, data?: any) => {
        ctx.body = { status: 0, message: msg, data: typeof data === 'string' ? { message: data } : data };
    }
}
