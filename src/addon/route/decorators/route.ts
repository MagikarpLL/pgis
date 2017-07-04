import HttpMethod from '../enums/http-method';
import DataType from '../enums/data-type';
import { Route } from '../core/route';
import * as Koa from 'koa';

export function route(config: { path: string, method: HttpMethod,mids?: Array<Koa.Middleware>, dataRequire?: {name : DataType.STRING , date: DataType.STRING, order?: DataType.STRING}, unless?: boolean }) {
    return (target: any, name: string, value: PropertyDescriptor) => {
        //map类型设置值
        Route.__DecoratedRouters.set({
            target: target,
            path: config.path,
            method: config.method,
            mids: config.mids,
            dataRequire:config.dataRequire,
            unless: config.unless
        }, target[name]);
    }
}