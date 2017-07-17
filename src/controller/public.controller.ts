import * as Router from 'koa-router';
import { Context } from '../utils/koa.util';
import { route, required, log, HttpMethod, DataType } from '../addon/route';
import {
    getRoleUsers, getUserRoles, allow, allowedPermissions,
    removeAllow, hasRole, removeResource, removeRole
} from '../utils/auth.util'
/**
 * 路由加载规则
 * 文件命名必须以.controller.ts结尾
 * 文件内有且仅有一个class 并且该class必须以default方式export
 */
export default class AuthController {

    @route({
        path: '/getRoleUsers',
        method: HttpMethod.GET,
        unless: true,
    })
    @required({
        'query': ['roleName'],
    })
    @log
    async getRoleUsers(ctx: Context, next: Function): Promise<void> {
        try {
            let { roleName } = ctx.request.query;
            const obj = await getRoleUsers(roleName);
            ctx.success({ users: obj }, 'success');
        } catch (e) {
            console.error(e);
            ctx.error('error', e);
        }
    }


    @route({
        path: '/getUserRoles/:id',
        method: HttpMethod.GET,
        unless: true,
    })
    @log
    async getUserRoles(ctx: Context, next: Function): Promise<void> {
        try {
            const obj = await getUserRoles(ctx.params.id);
            ctx.success({ roles: obj }, 'success');
        } catch (e) {
            console.error(e);
            ctx.error('error', e);
        }
    }


    @route({
        path: '/allow',
        method: HttpMethod.POST,
        unless: true,
    })
    @required({
        'body': ['roles', 'resources', 'perimissions'],
    })
    @log
    async allow(ctx: Context, next: Function): Promise<void> {
        try {
            let { roles, resources, perimissions } = ctx.request.body;
            const obj = await allow(roles, resources, perimissions);
            ctx.success({ status: obj }, 'success');
        } catch (e) {
            console.error(e);
            ctx.error('error', e);
        }
    }

    @route({
        path: '/removeAllow',
        method: HttpMethod.POST,
        unless: true,
    })
    @required({
        'body': ['roles', 'resources', 'perimissions'],
    })
    @log
    async removeAllow(ctx: Context, next: Function): Promise<void> {
        try {
            let { roles, resources, perimissions } = ctx.request.body;
            const obj = await removeAllow(roles, resources, perimissions);
            ctx.success({ permissions: obj }, 'success');
        } catch (e) {
            console.error(e);
            ctx.error('error', e);
        }
    }

    @route({
        path: '/removeResource',
        method: HttpMethod.POST,
        unless: true,
    })
    @required({
        'body': ['resources'],
    })
    @log
    async removeResource(ctx: Context, next: Function): Promise<void> {
        try {
            let { resources } = ctx.request.body;
            const obj = await removeResource(resources);
            ctx.success({ status: obj }, 'success');
        } catch (e) {
            console.error(e);
            ctx.error('error', e);
        }
    }

    @route({
        path: '/removeRole',
        method: HttpMethod.POST,
        unless: true,
    })
    @required({
        'body': ['roleName'],
    })
    @log
    async removeRole(ctx: Context, next: Function): Promise<void> {
        try {
            let { roleName } = ctx.request.body;
            const obj = await removeRole(roleName);
            ctx.success({ status: obj }, 'success');
        } catch (e) {
            console.error(e);
            ctx.error('error', e);
        }
    }



    @route({
        path: '/allowedPermissions/:id',
        method: HttpMethod.GET,
        unless: true,
    })
    @required({
        'query': ['resources'],
    })
    @log
    async allowedPermissions(ctx: Context, next: Function): Promise<void> {
        try {
            let { resources } = ctx.request.query;
            const obj = await allowedPermissions(ctx.params.id, resources);
            ctx.success({ permissions: obj }, 'success');
        } catch (e) {
            console.error(e);
            ctx.error('error', e);
        }
    }


    @route({
        path: '/hasRole/:id',
        method: HttpMethod.POST,
        unless: true,
    })
    @required({
        'body': ['roleName'],
    })
    @log
    async hasRole(ctx: Context, next: Function): Promise<void> {
        try {
            let { roleName } = ctx.request.body;
            const obj = await hasRole(ctx.params.id, roleName);
            ctx.success({ status: obj }, 'success');
        } catch (e) {
            console.error(e);
            ctx.error('error', e);
        }
    }


}
