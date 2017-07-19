import * as Router from 'koa-router';
import { Context } from '../../utils/koa.util';
import { route, required, log, HttpMethod, DataType } from '../../addon/route';
import { lineToHump } from '../../utils/split.util';
import { building, unit,room } from "../../biz/countSelect.biz";

export default class CountSelectController {

    //带参统计查询-----building
    @route({
        path: '/building',
        method: HttpMethod.POST,
        unless: true,
    })
    @required({
        'body': ['buildingId'],
    })
    @log
    async building(ctx: Context, next: Function): Promise<void> {
        try {
            console.log(ctx.request.body);
            let result = await building(ctx.request.body, ctx.db, ctx.sql);
            console.log(result);
            ctx.success(result, 'success');
        } catch (e) {
            console.error(e);
            ctx.error('error', e);
        }
    }

     //带参统计查询-----unit
    @route({
        path: '/unit',
        method: HttpMethod.POST,
        unless: true,
    })
    @required({
        'body': ['buildingId','unit'],
    })
    @log
    async unit(ctx: Context, next: Function): Promise<void> {
        try {
            console.log(ctx.request.body);
            let result = await unit(ctx.request.body, ctx.db, ctx.sql);
            console.log(result);
            ctx.success(result, 'success');
        } catch (e) {
            console.error(e);
            ctx.error('error', e);
        }
    }

         //带参统计查询-----room
    @route({
        path: '/room',
        method: HttpMethod.POST,
        unless: true,
    })
    @required({
        'body': ['buildingId','unit','room'],
    })
    @log
    async room(ctx: Context, next: Function): Promise<void> {
        try {
            console.log(ctx.request.body);
            let result = await room(ctx.request.body, ctx.db, ctx.sql);
            console.log(result);
            ctx.success(result, 'success');
        } catch (e) {
            console.error(e);
            ctx.error('error', e);
        }
    }


}
