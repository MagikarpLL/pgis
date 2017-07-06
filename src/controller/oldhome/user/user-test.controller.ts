import * as Koa from 'koa';
import * as Router from 'koa-router';
import { login, register } from '../../../biz/user.biz';
import Controller from '../../../utils/controller.util';
import { route, required, log, HttpMethod, DataType } from '../../../addon/route';

export default class UserTestController {

    //登录
    @route({
        path: '/test',
        method: HttpMethod.GET,
        unless: false,
    })
    @log
    async login(ctx: Koa.Context, next: Function): Promise<void> {
        let controller = new Controller(ctx);
        try {
            console.log(ctx.header);
            controller.success('sucess', {
                token: 'token'
            });
        } catch (e) {
            console.error(e);
            controller.error('error', e);
        }
    }
}
