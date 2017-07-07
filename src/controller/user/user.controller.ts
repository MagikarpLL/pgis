import * as Router from 'koa-router';
import { Context } from '../../utils/koa.util';
import { login, register, verify, addUserRoles, removeUserRoles } from '../../biz/user.biz';
import { route, required, log, HttpMethod, DataType } from '../../addon/route';

/**
 * 路由加载规则
 * 文件命名必须以.controller.ts结尾
 * 文件内有且仅有一个class 并且该class必须以default方式export
 */
export default class UserController {

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
            ctx.success({ role: obj }, 'success');
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
        path: '/verify/:id',
        method: HttpMethod.POST,
        unless: true,
    })
    @required({
        body: ['resources', 'permissions']
    })
    @log
    async verify(ctx: Context, next: Function): Promise<any> {
        try {
            let { resources, permissions } = ctx.request.body;
            let result = await verify(ctx.params.id, resources, permissions);
            ctx.success(result, 'success');
        } catch (e) {
            console.error(e);
            ctx.error('error', e);
        }
    }


    //修改用户角色类型,roles可为数组
    @route({
        path: '/get/:id',
        method: HttpMethod.POST,
        unless: true,
    })
    @required({
        body: 'roles'
    })
    @log
    async addUserRoles(ctx: Context, next: Function): Promise<any> {
        try {
            let { roles } = ctx.request.body;
            let result = await addUserRoles(ctx.params.id, roles);
            ctx.success(result, 'success');
        } catch (e) {
            console.error(e);
            ctx.error('error', e);
        }
    }

    //撤回用户的某（些）角色类型
    @route({
        path: '/remove/:id',
        method: HttpMethod.POST,
        unless: true,
    })
    @required({
        body: 'roles'
    })
    @log
    async removeUserRoles(ctx: Context, next: Function): Promise<any> {
        try {
            let { roles } = ctx.request.body;
            let result = await removeUserRoles(ctx.params.id, roles);
            ctx.success(result, 'success');
        } catch (e) {
            console.error(e);
            ctx.error('error', e);
        }
    }

}
