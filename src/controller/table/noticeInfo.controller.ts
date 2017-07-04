import * as Router from 'koa-router';
import { Context } from '../../utils/koa.util';
import { insert, remove } from '../../biz/table/noticeInfo.biz';
import { retrieve, update, findOneInDatabase } from '../../biz/public-crud.biz';
import { route, required, log, HttpMethod, DataType } from '../../addon/route';

export default class NoticeInfoController {

    //增
    @route({
        path: '',
        method: HttpMethod.POST,
        unless: true,
    })
    @required({
        'body': ['empidCreate'],
    })
    @log
    async insert(ctx: Context, next: Function): Promise<void> {
        try {
            let result = await insert(ctx.request.body, ctx.db);
            ctx.success(result, 'success');
        } catch (e) {
            console.error(e);
            ctx.error('error', e);
        }
    }



    //多条查
    @route({
        path: '',
        method: HttpMethod.GET,
        unless: true,
    })
    @log
    async retrieve(ctx: Context, next: Function): Promise<any> {
        try {
            var result = await retrieve(ctx.request.query, ctx.db, 'notice_info');
            ctx.success(result, 'success');
        } catch (e) {
            console.error(e);
            ctx.error('error', e);
        }
    }

    //单条查
    @route({
        path: '/:id',
        method: HttpMethod.GET,
        unless: true,
    })
    @log
    async retrieveOne(ctx: Context, next: Function): Promise<any> {
        try {
            var result = await findOneInDatabase('notice_info', 'id_', ctx.params.id, ctx.db);
            ctx.success(result, 'success');
        } catch (e) {
            console.error(e);
            ctx.error('error', e);
        }
    }

    //删
    @route({
        path: '/:id',
        method: HttpMethod.DELETE,
        unless: true,
    })
    @log
    async remove(ctx: Context, next: Function): Promise<void> {
        try {

            let result = await remove(ctx.db, ctx.params.id);
            ctx.success(result, 'success');
        } catch (e) {
            console.error(e);
            ctx.error('error', e);
        }
    }

    //改
    @route({
        path: '/:id/:empidUpdate',
        method: HttpMethod.PATCH,
        unless: true,
    })
    @log
    async update(ctx: Context, next: Function): Promise<any> {
        try {
            var result = await update(ctx.request.body, ctx.db, 'notice_info', 'id_', ctx.params.id, ctx.params.empidUpdate);
            ctx.success(result, 'success');
        } catch (e) {
            console.error(e);
            ctx.error('error', e);
        }
    }


}
