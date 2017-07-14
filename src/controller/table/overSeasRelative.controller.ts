import * as Router from 'koa-router';
import { Context } from '../../utils/koa.util';
import { insert, remove, findOneInDatabase, getWholeTable, update } from '../../biz/table/overSeasRelative.biz';
import { route, required, log, HttpMethod, DataType } from '../../addon/route';

//tb_overSeasRelative
export default class OverSeasRelativeController {

    //增
    @route({
        path: '',
        method: HttpMethod.POST,
        unless: true,
    })
    @required({
        'body': ['gender', 'residenceId', 'name','ethnicity' ,'relationToHouseHolder','updateUsrId'],
    })
    @log
    async insert(ctx: Context, next: Function): Promise<void> {
        try {

            let result = await insert(ctx.request.body, ctx.db, ctx.sql);
            ctx.success(result, 'success');
        } catch (e) {
            console.error(e);
            ctx.error('error', e);
        }
    }

    //查
    @route({
        path: '',
        method: HttpMethod.GET,
        unless: true,
    })
    @log
    async retrieve(ctx: Context, next: Function): Promise<any> {
        try {
            var result = await getWholeTable('tb_overSeasRelative', ctx.db);
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
            var result = await findOneInDatabase('tb_overSeasRelative', 'residenceId', ctx.params.id, ctx.db);
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

            let result = await remove(ctx.db, ctx.params.id, ctx.sql);
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
    @required({
        'body': ['updateUsrId'],
    })
    @log
    async update(ctx: Context, next: Function): Promise<any> {
        try {
            var result = await update(ctx.request.body, ctx.sql, 'tb_overSeasRelative', 'residenceId', ctx.params.id, ctx.db);
            ctx.success(result, 'success');
        } catch (e) {
            console.error(e);
            ctx.error('error', e);
        }
    }

}
