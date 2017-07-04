'use strict'
import * as Koa from 'koa';

//记录请求数
let requestID = 0;

/**
 * 日志 修饰api方法
 * use: @log
 * @export
 * @param {*} target
 * @param {string} name
 * @param {PropertyDescriptor} value
 * @returns
 */
export function log (target: any, name: string, value: PropertyDescriptor) {
    target[name] = sureIsArray(target[name]);
    target[name].splice(target[name].length - 1, 0, Logger);
    
    async function Logger(ctx: Koa.Context, next: any){
        //请求数加1
        let currentRequestID = requestID++;
    
        //请求开始时间
        const startTime = process.hrtime();
        console.log(`→ (ID:${currentRequestID}) ${ctx.method} ${ctx.url}`);
        if((ctx.method).toLowerCase()  == 'post'){
            console.log(`→ (ID:${currentRequestID}) ${ctx.method} ${JSON.stringify(ctx.request.body)}`);
        }
        await next();
    
        //返回response结束时间
        const endTime = process.hrtime();
        //计算进程总时间
        const elapsed = (endTime[0]-startTime[0]) * 1000 + (endTime[1]-startTime[1]) / 1000000;
        console.log(`← (ID:${currentRequestID}) ${ctx.method} ${ctx.url} : Status(${ctx.status}) Time(${elapsed.toFixed(0)}ms)`);
    
    }
    return value;
}

/**
 * 转换数组
 */
function sureIsArray (arr: any) {
    return Array.isArray(arr) ? arr : [arr];
}