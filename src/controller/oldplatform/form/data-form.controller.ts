import * as Router from 'koa-router';
import { Context } from '../../../utils/koa.util';
import { route, required, log, HttpMethod, DataType } from '../../../addon/route';

import * as biz from '../../../biz/data-form.biz';

export default class DataFormController {
    /**
     * 数据表单检索
     * @param ctx 
     * @param next 
     */
    @route({
        path: '',
        method: HttpMethod.GET,
        unless: true,
    })
    @log
    async getList(ctx: Context, next: Function): Promise<any> {
        try {
            const data = await biz.getDataFormList();
            ctx.success(data);
        } catch (e) {
            console.error(e);
            ctx.error('error', e);
        }
    }

    /**
     * 检索单条数据表单
     * @param ctx 
     * @param next 
     */
    @route({
        path: '/:id',
        method: HttpMethod.GET,
        unless: true,
    })
    @log
    async getDataForm(ctx: Context, next: Function): Promise<any> {
        try {
            const data = await biz.getDataFormInfo(ctx.params.id);
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
        body: ['name', 'controls']
    })
    @log
    async addDataForm(ctx: Context, next: Function): Promise<any> {
        try {
            const { name, remark, controls } = ctx.request.body;
            const data = await biz.addDataForm(ctx,name, remark, controls);
            ctx.success(data);
        } catch (e) {
            console.error(e);
            ctx.error('error', e);
        }
    }

    @route({
        path: '/:id',
        method: HttpMethod.PATCH,
        unless: true,
    })
    @log
    async updateDataForm(ctx: Context, next: Function): Promise<any> {
        try {
            const { name, remark, controls } = ctx.request.body;
            const result = await biz.updateDataForm(ctx,ctx.params.id, name, remark, controls);
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
    async deleteDataForm(ctx: Context, next: Function): Promise<any> {
        try {
            const result = await biz.deleteDataForm(ctx,ctx.params.id);
            ctx.success(result);
        } catch (e) {
            ctx.error('error', e);
        }
    }

}