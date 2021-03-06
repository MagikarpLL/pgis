import * as Router from 'koa-router';
import { Context } from '../../utils/koa.util';
import { route, required, log, HttpMethod, DataType } from '../../addon/route';
import { lineToHump } from '../../utils/split.util';
import { building, unit, room, residentialAreas } from "../../biz/countSelect.biz";
import { encode, decode } from '../../utils/crypto.util';

export default class CountSelectController {

    //带参统计查询-----residentialAreas
    @route({
        path: '/residentialAreas',
        method: HttpMethod.POST,
        unless: true,
    })
    @required({
        'body': 'value'
    })
    @log
    async residentialAreas(ctx: Context, next: Function): Promise<void> {
        try {
            let body = decode(ctx.request.body.value);
            body = JSON.parse(body);
            let result = await residentialAreas(body, ctx.db, ctx.sql);
            let fin = encode(JSON.stringify(result));
            ctx.success(fin, 'success');
        } catch (e) {
            console.error(e);
            ctx.error('error', e);
        }
    }

    //带参统计查询-----building
    @route({
        path: '/building',
        method: HttpMethod.POST,
        unless: true,
    })
    @required({
        'body': 'value'
    })
    @log
    async building(ctx: Context, next: Function): Promise<void> {
        try {
            let body = decode(ctx.request.body.value);
            body = JSON.parse(body);
            let result = await building(body, ctx.db, ctx.sql);
            let fin = encode(JSON.stringify(result));
            ctx.success(fin, 'success');
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
        'body': 'value'
    })
    @log
    async unit(ctx: Context, next: Function): Promise<void> {
        try {
            let body = decode(ctx.request.body.value);
            body = JSON.parse(body);
            let result = await unit(body, ctx.db, ctx.sql);
            let fin = encode(JSON.stringify(result));
            ctx.success(fin, 'success');
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
        'body': 'value'
    })
    @log
    async room(ctx: Context, next: Function): Promise<void> {
        try {
            let body = decode(ctx.request.body.value);
            body = JSON.parse(body);
            console.log(body);
            let result = await room(body, ctx.db, ctx.sql);
            let fin = encode(JSON.stringify(result));
            ctx.success(fin, 'success');
        } catch (e) {
            console.error(e);
            ctx.error('error', e);
        }
    }


}
