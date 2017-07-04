/**
 * 路由加载规则
 * 文件命名必须以.controller.ts结尾
 * 文件内有且仅有一个class 并且该class必须以default方式export
 */
import * as Koa from 'koa';
import * as Router from 'koa-router';
import { route, HttpMethod } from '../addon/route';

import JWT from '../utils/jwt.util';
import redis from '../utils/redis.util';

export default class PublicController {

    @route({
        path: '/test',
        method: HttpMethod.GET,
        unless: false
    })
    async test(ctx: Koa.Context, next: Function): Promise<void> {
        // redis.set('foo', 'bar', 'msg', 'Hello');
        redis.set('test:hi', 'Hello')
        let result = await redis.get('test:hi');
        ctx.body = { msg: result };

    }

    @route({
        path: '/token/create',
        method: HttpMethod.GET,
        unless: true
    })
    async sign(ctx: Koa.Context, next: Function): Promise<void> {
        let token = JWT.sign({
            username: 'admin'
        }, 30)
        ctx.body = { token: token };
    }

    @route({
        path: '/token/verify',
        method: HttpMethod.GET,
        unless: true
    })
    async verify(ctx: Koa.Context, next: Function): Promise<void> {
        let token = ctx.request.query.token;
        let result = JWT.verify(token);
        ctx.body = { msg: result };
    }

    @route({
        path: '/token/decode',
        method: HttpMethod.GET,
        unless: true
    })
    async decode(ctx: Koa.Context, next: Function): Promise<void> {
        let token = ctx.request.query.token;
        let result = JWT.decode(token);
        ctx.body = { msg: result };
    }
}
