import * as Router from 'koa-router';
import { Context } from '../../utils/koa.util';
import { insert, remove, findOneInDatabase, getWholeTable, update, multiSelect } from '../../biz/table/populationDetail.biz';
import { route, required, log, HttpMethod, DataType } from '../../addon/route';

//tb_populationdetailed
export default class PopulationDetailedController {

    //增
    @route({
        path: '',
        method: HttpMethod.POST,
        unless: true,
    })
    @required({
        'body': ['idNumber', 'residenceId', 'name', 'updateUserId'],
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

    //查整表
    @route({
        path: '',
        method: HttpMethod.GET,
        unless: true,
    })
    @log
    async retrieve(ctx: Context, next: Function): Promise<any> {
        try {
            var result = await getWholeTable('tb_populationdetailed', ctx.db);
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
            var result = await findOneInDatabase('tb_populationdetailed', 'idNumber', ctx.params.id, ctx.db);
            ctx.success(result, 'success');
        } catch (e) {
            console.error(e);
            ctx.error('error', e);
        }
    }


    //多参数查询
    @route({
        path: '/multi',
        method: HttpMethod.POST,
        unless: true,
    })
    @log
    async multiSelect(ctx: Context, next: Function): Promise<any> {
        try {
            var result = await multiSelect('tb_populationdetailed', ctx.request.body, ctx.sql, ctx.db);
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
        'body': ['updateUserId'],
    })
    @log
    async update(ctx: Context, next: Function): Promise<any> {
        try {
            var result = await update(ctx.request.body, ctx.sql, 'tb_populationdetailed', 'idNumber', ctx.params.id, ctx.db);
            ctx.success(result, 'success');
        } catch (e) {
            console.error(e);
            ctx.error('error', e);
        }
    }

}
