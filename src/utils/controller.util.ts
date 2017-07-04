import * as Koa from 'koa';
// import "reflect-metadata";

interface Response {
    status: number;
    message: string;
    data: object;
}

export default class Controller {

    constructor(private ctx : Koa.Context) {
    }

    private json(res: Response) {
        this.ctx.body = res;
    }

    success(msg: string, data: object) {
        this.json({ status: 1, message: msg, data: data });
    }

    error(msg: string, data: object) {
        this.json({ status: 0, message: msg, data: data });
    }

}




// const contextMetadataKey = Symbol("context");

// export function context(target: Object, propertyKey: string | symbol, parameterIndex: number) {
//     let existingRequiredParameters: number[] = Reflect.getOwnMetadata(contextMetadataKey, target, propertyKey) || [];
//     existingRequiredParameters.push(parameterIndex);
//     Reflect.defineMetadata(contextMetadataKey, existingRequiredParameters, target, propertyKey);
// }