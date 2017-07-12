import * as Router from 'koa-router';
import { Context } from '../../utils/koa.util';
import { route, required, log, HttpMethod, DataType } from '../../addon/route';
import { lineToHump } from '../../utils/split.util';
import { residence } from "../../biz/data-input.biz";

export default class DatainputController {

    //数据上传-----楼房信息表
    @route({
        path: '/residence',
        method: HttpMethod.POST,
        unless: true,
    })
    @log
    async create(ctx: Context, next: Function): Promise<void> {
        try {
            console.log(ctx.request.body);
            let result = await residence(ctx.request.body, ctx.db);
            console.log(result);
            ctx.success(result, 'success');
        } catch (e) {
            console.error(e);
            ctx.error('error', e);
        }
    }
}
