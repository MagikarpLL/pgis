import * as Router from 'koa-router';
import { Context } from '../../utils/koa.util';
import { getWholeTable } from '../../biz/public-crud.biz';
import { route, required, log, HttpMethod, DataType } from '../../addon/route';
import {lineToHump} from '../../utils/split.util'

export default class CrudController {

    //整表查询
    @route({
        path: '',
        method: HttpMethod.GET,
        unless: true,
    })
    @required({
        'query': ['tableName'],
    })
    @log
    async create(ctx: Context, next: Function): Promise<void> {
        try {
            let result = await getWholeTable(ctx.request.query, ctx.db);
           // console.log(result);
            ctx.success(result, 'success');
        } catch (e) {
            console.error(e);
            ctx.error('error', e);
        }
    }
}
