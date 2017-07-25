import * as Router from 'koa-router';
import { Context } from '../../utils/koa.util';
import { login, register, verify, addUserRoles, removeUserRoles, getAllUsers, findOneInDatabase, modifyUserRole, update } from '../../biz/user.biz';
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

    @log
    async login(ctx: Context, next: Function): Promise<void> {
        try {
            console.log('body is ', ctx.request.body);
            const obj = await login(ctx.db, ctx.request.body);
            ctx.success({ usrId: obj }, 'success');
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
        'body': 'value'
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


    //添加用户角色类型,roles可为数组
    @route({
        path: '/add/:id',
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

    //修改用户角色类型,roles可为数组
    @route({
        path: '/modify/:id',
        method: HttpMethod.POST,
        unless: true,
    })
    @required({
        body: ['oldRoles', 'newRoles']
    })
    @log
    async modifyUserRole(ctx: Context, next: Function): Promise<any> {
        try {
            let { oldRoles, newRoles } = ctx.request.body;
            let result = await modifyUserRole(ctx.params.id, oldRoles, newRoles);
            ctx.success(result, 'success');
        } catch (e) {
            console.error(e);
            ctx.error('error', e);
        }
    }

    @route({
        path: '',
        method: HttpMethod.GET,
        unless: true,
    })
    @log
    async getAllUsers(ctx: Context, next: Function): Promise<any> {
        try {
            let result = await getAllUsers('tb_usr', ctx.db);
            ctx.success(result, 'success');
        } catch (e) {
            console.error(e);
            ctx.error('error', e);
        }
    }

    //改
    @route({
        path: '/:id',
        method: HttpMethod.PATCH,
        unless: true,
    })
    @log
    async update(ctx: Context, next: Function): Promise<any> {
        try {
            // let id = decode(ctx.params.id);
            // let body = decode(ctx.request.body.value);
            //body = JSON.parse(body);
            var result = await update(ctx.request.body, ctx.sql, 'tb_usr', 'usrId', ctx.params.id, ctx.db);
            ctx.success(result, 'success');
        } catch (e) {
            console.error(e);
            ctx.error('error', e);
        }
    }



}
