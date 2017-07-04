import * as Router from 'koa-router';
import { Context } from '../../../utils/koa.util';
import { route, required, log, HttpMethod, DataType } from '../../../addon/route';
import * as biz from '../../../biz/datasource.biz';

export default class DataSourceController {
    /**
     * 数据源检索
     * @param ctx 
     * @param next 
     */
    @route({
        path: '',
        method: HttpMethod.GET,
        unless: true,
    })
    @log
    async getDatasource(ctx: Context, next: Function): Promise<any> {
        try {
            const data = await biz.getDatasource();
            ctx.success(data);
        } catch (e) {
            console.error(e);
            ctx.error('error', e);
        }
    }

    @route({
        path: '',
        method: HttpMethod.POST,
        unless: true,
    })
    @required({
        'body': ['datasourceName', 'sql'],
    })
    @log
    async saveDatasource(ctx: Context, next: Function): Promise<any> {
        try {
            const { datasourceName, createTime, sql, remark } = ctx.request.body;
            const result = await biz.saveDatasource(datasourceName, sql, remark);
            ctx.success(result);
        } catch (e) {
            ctx.error('error', e);
        }
    }

    @route({
        path: '/:id',
        method: HttpMethod.PATCH,
        unless: true,
    })
    @log
    async updateDatasource(ctx: Context, next: Function): Promise<any> {
        try {
            const { datasourceName, sql, remark } = ctx.request.body;
            const result = await biz.updateDatasource(ctx.params.id, datasourceName, sql, remark);
            ctx.success(result);
        } catch (e) {
            ctx.error('error', e);
        }
    }

    @route({
        path: '/:id',
        method: HttpMethod.DELETE,
        unless: true,
    })
    @log
    async deleteDatasource(ctx: Context, next: Function): Promise<any> {
        try {
            const result = await biz.deleteDatasource(ctx.params.id);
            ctx.success(result);
        } catch (e) {
            ctx.error('error', e);
        }
    }

    @route({
        path: '/:id',
        method: HttpMethod.GET,
        unless: true,
    })
    @log
    async findOneDatasource(ctx: Context, next: Function): Promise<any> {
        try {
            const result = await biz.findOneDatasource(ctx.params.id);
            ctx.success(result);
        } catch (e) {
            ctx.error('error', e);
        }
    }

    @route({
        path: '/preview',
        method: HttpMethod.POST,
        unless: true,
    })
    @required({
        'body': ['sql'],
    })
    @log
    async preview(ctx: Context, next: Function): Promise<any> {
        try {
            const { sql } = ctx.request.body;
            const data = await ctx.db.query(sql);
            ctx.success(JSON.parse(data.result));
        } catch (e) {
            ctx.error('error', e);
        }
    }


}