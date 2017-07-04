import * as Router from 'koa-router';
import { Context } from '../../utils/koa.util';
import { route, required, log, HttpMethod, DataType } from '../../addon/route';
import * as biz from '../../biz/db.biz';

export default class DBController {

    /**
     * 查询语句接口
     * @param ctx 
     * @param next 
     */
    @route({
        path: '/query',
        method: HttpMethod.POST,
        unless: true,
    })
    @required({
        'body': ['sql'],
    })
    @log
    async query(ctx: Context, next: Function): Promise<any> {
        try {
            let { sql } = ctx.request.body;
            const obj = await ctx.db.query(sql);
            console.log(obj.result);
            ctx.success(JSON.parse(obj.result), 'success');
        } catch (e) {
            // console.error(e);
            ctx.error('error', e);
        }
    }

    /**
     * 增删改语句接口
     * @param ctx 
     * @param next 
     */
    @route({
        path: '/edit',
        method: HttpMethod.POST,
        unless: true,
    })
    @required({
        'body': ['sql'],
    })
    @log
    async edit(ctx: Context, next: Function): Promise<any> {
        try {
            let { sql } = ctx.request.body;
            const obj = await ctx.db.edit(sql);
            console.log(obj.result);
            ctx.success(JSON.parse(obj.result), 'success');
        } catch (e) {
            // console.error(e);
            ctx.error('error', e);
        }
    }
}

