import * as Koa from 'koa';

interface Response {
    status: number;
    message: string;
    data: object;
}

function json(res: Response) {
    this.ctx.body = res;
}

function success(msg: string, data: object) {
    this.json({ status: 1, message: msg, data: data });
}

function error(msg: string, data: object) {
    this.json({ status: 0, message: msg, data: data });
}


export default async (ctx: Koa.Context, next: Function) => {
    // ctx.success = function () {
        
    // }
}