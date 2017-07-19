import * as Router from 'koa-router';
import { Context } from '../../utils/koa.util';
import { insert, remove, findOneInDatabase, getWholeTable, update, multiSelect } from '../../biz/table/residence.biz';
import { route, required, log, HttpMethod, DataType } from '../../addon/route';
import { encode, decode } from '../../utils/crypto.util';
//tb_residence
export default class ResidenceController {

    //增
    @route({
        path: '',
        method: HttpMethod.POST,
        unless: true,
    })
    @required({
        'body': ['roomId', 'houseHoldId', 'registrant', 'phone', 'updateUserId',
            'householderName', 'householderId', 'housingArea', 'housingCategory', 'familyPlanningCategory'],
    })
    @log
    async insert(ctx: Context, next: Function): Promise<void> {
        try {
            let body = decode(ctx.request.body);
            body = JSON.parse(body);
            let result = await insert(body, ctx.db, ctx.sql);
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
            var result = await getWholeTable('tb_residence', ctx.db);
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
            let id = decode(ctx.params.id);
            var result = await findOneInDatabase('tb_residence', 'houseHoldId', id, ctx.db);
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
            let body = decode(ctx.request.body);
            body = JSON.parse(body);
            var result = await multiSelect('tb_residence', body, ctx.sql, ctx.db);
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
            let id = decode(ctx.params.id);
            let result = await remove(ctx.db, id, ctx.sql);
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
            let id = decode(ctx.params.id);
            let body = decode(ctx.request.body);
            body = JSON.parse(body);
            var result = await update(body, ctx.sql, 'tb_residence', 'houseHoldId', id, ctx.db);
            ctx.success(result, 'success');
        } catch (e) {
            console.error(e);
            ctx.error('error', e);
        }
    }

}
