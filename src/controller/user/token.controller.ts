import * as Router from 'koa-router';
import { Context } from '../../utils/koa.util';
// import { login, register, verifyAuth,passSql } from '../../biz/user.biz';
import { login, register } from '../../biz/user.biz';
import { route, required, log, HttpMethod, DataType } from '../../addon/route';

export default class TokenController {

    //登录
    @route({
        path: '/login',
        method: HttpMethod.POST,
        unless: true,
    })
    @required({
        'body': ['username', 'password',],
    })
    @log
    async login(ctx: Context, next: Function): Promise<void> {
        try {

            let { username, password } = ctx.request.body;
            const obj = await login(ctx.db, username, password);
            ctx.success({ roleId: obj }, 'success');
        } catch (e) {
            console.error(e);
            ctx.error('error', e);
        }
    }

    //注册
    @route({
        path: '/register',
        method: HttpMethod.POST,
        unless: true,
    })
    @required({
        'body': ['userName', 'userPass'],
    })
    @log
    async register(ctx: Context, next: Function): Promise<void> {
        try {
            let result = await register(ctx.request.body, ctx.db);
            ctx.success(result, 'success');
        } catch (e) {
            console.error(e);
            ctx.error('error', e);
        }
    }

    //验证权限
    @route({
        path: '/verify',
        method: HttpMethod.POST,
        unless: true,
    })
    @required({
        body: 'pageEncoding'
    })
    @log
    async verify(ctx: Context, next: Function): Promise<any> {
        // try{
        //     let token = ctx.header.authorization;
        //     let{pageEncoding} = ctx.request.body;
        //     var result = await verifyAuth(token, pageEncoding);
        //     if(result.bool)ctx.success({bool: result.bool});
        // }catch(e){
        //     console.error(e);
        //     ctx.error('wrong token or user has not auth',e);
        // }
    }

}
