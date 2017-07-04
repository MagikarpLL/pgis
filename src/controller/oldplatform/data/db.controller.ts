import * as Router from 'koa-router';
import { Context } from '../../../utils/koa.util';
import { route, required, log, HttpMethod, DataType } from '../../../addon/route';
import * as biz from '../../../biz/db.biz';

export default class DBController {
    /**
     * 获取数据库基本信息
     * @param ctx 
     * @param next 
     */
    @route({
        path: '/getPros',
        method: HttpMethod.GET,
        unless: true,
    })
    @log
    async getPros(ctx: Context, next: Function): Promise<any> {
        try {
            const obj = await ctx.db.getPros();
            console.log(obj.result);
            ctx.success(JSON.parse(obj.result), 'success');
        } catch (e) {
            console.error(e);
            ctx.error('error', e);
        }
    }

    /**
     * 查询数据库所有表
     * @param ctx 
     * @param next 
     */
    @route({
        path: '/tables',
        method: HttpMethod.GET,
        unless: true,
    })
    @log
    async getTables(ctx: Context, next: Function): Promise<any> {
        try {
            const result = await biz.getTables(ctx);
            ctx.success(result, 'success');
        } catch (e) {
            ctx.error('error', e);
        }
    }

    /**
     * 创建表
     * @param ctx 
     * @param next 
     */
    @route({
        path: '/createTable',
        method: HttpMethod.POST,
        unless: true,
    })
    @required({
        'body': ['name', 'description', 'columns'],
    })
    @log
    async createTable(ctx: Context, next: Function): Promise<any> {
        try {
            const { name, description, columns } = ctx.request.body;
            const result = await biz.createTable(ctx, name, description, columns);
            ctx.success(result);
        } catch (e) {
            ctx.error('error', e);
        }
    }
    @route({
        path: '/alterTable',
        method: HttpMethod.POST,
        unless: true,
    })
    @required({
        'body': ['name', 'columns'],
    })
    @log
    async alterTable(ctx: Context, next: Function): Promise<any> {
        const { name, columns } = ctx.request.body;
        const result = await biz.alterTable(ctx, name, columns);
        ctx.success(result);
    }

    /**
     * 删除单表
     * @param ctx 
     * @param next 
     */
    @route({
        path: '/tables/:tableName',
        method: HttpMethod.DELETE,
        unless: true,
    })
    @log
    async deleteTable(ctx: Context, next: Function): Promise<any> {
        try {
            console.log(ctx.db.dbType);
            const { tableName } = ctx.params;
            console.log(tableName);
            const result = await biz.deleteTable(ctx, tableName);
            ctx.success(result);
        } catch (e) {
            ctx.error('error', e);
        }
    }

    /**
     * 查询单表结构
     * @param ctx 
     * @param next 
     */
    @route({
        path: '/queryTable',
        method: HttpMethod.GET,
        unless: true,
    })
    @required({
        'query': ['name'],
    })
    @log
    async queryTable(ctx: Context, next: Function): Promise<any> {
        try {
            console.log(ctx.request.query);
            const { name } = ctx.request.query;
            const result = await biz.queryTable(ctx, name);
            ctx.success(result);
        } catch (e) {
            ctx.error('error', e);
        }
    }
}