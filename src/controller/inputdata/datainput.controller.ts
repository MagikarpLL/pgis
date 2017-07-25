import * as Router from 'koa-router';
import { Context } from '../../utils/koa.util';
import { route, required, log, HttpMethod, DataType } from '../../addon/route';
import { lineToHump } from '../../utils/split.util';
import { residence, populationDetailed, population, overSeaRelative } from "../../biz/data-input.biz";
import { encode, decode } from '../../utils/crypto.util';

export default class DatainputController {

    //数据上传-----楼房信息表
    @route({
        path: '/residence',
        method: HttpMethod.POST,
        unless: true,
    })
    @log
    async residence(ctx: Context, next: Function): Promise<void> {
        try {
            let body = decode(ctx.request.body.value);
            body = JSON.parse(body);
            let result = await residence(body, ctx.db, ctx.sql);
            console.log(result);
            ctx.success(result, 'success');
        } catch (e) {
            console.error(e);
            ctx.error('error', e);
        }
    }

    //数据上传-----人口详细信息表
    @route({
        path: '/populationDetailed',
        method: HttpMethod.POST,
        unless: true,
    })
    @log
    async populationDetailed(ctx: Context, next: Function): Promise<void> {
        try {
            console.log(ctx.request.body);
            let result = await populationDetailed(ctx.request.body, ctx.db, ctx.sql);
            console.log(result);
            ctx.success(result, 'success');
        } catch (e) {
            console.error(e);
            ctx.error('error', e);
        }
    }

    //数据上传-----人口表
    @route({
        path: '/population',
        method: HttpMethod.POST,
        unless: true,
    })
    @log
    async population(ctx: Context, next: Function): Promise<void> {
        try {
            console.log(ctx.request.body);
            let result = await population(ctx.request.body, ctx.db, ctx.sql);
            console.log(result);
            ctx.success(result, 'success');
        } catch (e) {
            console.error(e);
            ctx.error('error', e);
        }
    }

    //数据上传-----海外亲属表
    @route({
        path: '/overSeaRelative',
        method: HttpMethod.POST,
        unless: true,
    })
    @log
    async overSeaRelative(ctx: Context, next: Function): Promise<void> {
        try {
            console.log(ctx.request.body);
            let result = await overSeaRelative(ctx.request.body, ctx.db, ctx.sql);
            console.log(result);
            ctx.success(result, 'success');
        } catch (e) {
            console.error(e);
            ctx.error('error', e);
        }
    }

}
