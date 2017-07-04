import * as Koa from 'koa';

/**
 * url参数
 * list/:id?username=zhangsan&&age=30
 * @required({query: 'username'}) 
 * @required({query: ['username','age'],params: 'id'}) 
 */
export function required(args: any) {
    return function (target: any, name: string, descriptor: PropertyDescriptor) {
        return requireDescriptor(target, name, descriptor, args);
    }
}

/**
 * URL必传参数校验
 * @required({params: 'username'})
 * @required({params: ['username','age']})
 * @required({query: 'username'})
 * @required({body: ['username','password','rememeber'})
 */
function requireDescriptor(target: any, name: string, descriptor: PropertyDescriptor, rules: any) {
    target[name] = sureIsArray(target[name]);
    target[name].splice(target[name].length - 1, 0, middleware);
    return descriptor;

    async function middleware(ctx: Koa.Context, next: any) {
        if (rules.query) {
            rules.query = sureIsArray(rules.query);
            for (let name of rules.query) {
                if (!ctx.query[name]) ctx.throw(412, `GET Request query: ${name} required`);
            }
        }
        if (rules.params) {
            rules.params = sureIsArray(rules.params);
            for (let name of rules.params) {
                if (!ctx.params[name]) ctx.throw(412, `GET Request params: ${name} required`);
            }
        }
        if (rules.body) {
            rules.body = sureIsArray(rules.body);
            for (let name of rules.body) {
                if (!ctx.request.body[name]) ctx.throw(412, `GET Request params: ${name} required`);
            }
        }
        await next();
    }
}

/**
 * 转换数组
 */
function sureIsArray(arr: any) {
    return Array.isArray(arr) ? arr : [arr];
}
