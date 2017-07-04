import UUID from '../utils/uuid.util';
import DATE from '../utils/date.util';
import OBJECT from '../utils/object.util';
import { Context } from '../utils/koa.util';

export async function findOneModel(ctx: Context, id: string) {
    const sql = ctx.sql.findOne('MH_ACT_BIZ_RE', 'ID_', id);
    const data = await ctx.db.query(sql);
    const result = OBJECT.toKeyCamel(JSON.parse(data.result)[0]);
    result['bizForm'] = result.bizForm.split(',');
    return result;
}

export async function saveModel(ctx: Context, id: string, bizForm: any[], description: string, key: string, name: string): Promise<any> {
    const bizFormArr: string[] = [];
    for (const form of bizForm) {
        bizFormArr.push(form.id);
    }
    const data = {
        id: id,
        createTime: DATE.getDateTime(),
        bizForm: bizFormArr.join(','),
        description: description,
        key: key,
        name: name
    };
    const sql = ctx.sql.insert('MH_ACT_BIZ_RE', OBJECT.toKeyLine(data));
    const result = await ctx.db.edit(sql);
    return result;
}

export async function updateModel(ctx: Context, id: string, bizForm: any[], description: string, key: string, name: string): Promise<any> {
    const bizFormArr: string[] = [];
    for (const form of bizForm) {
        bizFormArr.push(form.id);
    }
    const data = {
        bizForm: bizFormArr.join(','),
        description: description,
        key: key,
        name: name
    };
    const sql = ctx.sql.update('MH_ACT_BIZ_RE', OBJECT.toKeyLine(data), 'ID_', id);
    const result = await ctx.db.edit(sql);
    return result;
}

export async function deleteModel(ctx: Context, id: string) {
    const sql = ctx.sql.delete('MH_ACT_BIZ_RE', 'ID_', id);
    const result = await ctx.db.edit(sql);
    return result;
}
