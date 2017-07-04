import * as Koa from 'koa';
import * as Router from 'koa-router';
import * as jwt from 'koa-jwt';
import { symbolRoutePrefix } from './property';
import HttpMethod from '../enums/http-method';
import DataType from '../enums/data-type';
import Loader from '../../../utils/loader.util';

export class Route {
    //静态 存储被修饰后的路由的地方
    static __DecoratedRouters: Map<{ target: any, method: HttpMethod, path: string, mids?: Array<Koa.Middleware>, dataRequire?: {name : DataType.STRING , date: DataType.STRING, order?: DataType.STRING}, unless?: boolean }, Function | Function[]> = new Map();
    private router: any;

    /**
     * Creates an instance of Route.
     * 
     * @param {Koa} app
     * 
     * @memberOf Route
     */
    constructor(private app: Koa) {
        this.router = new Router();
    }

    routes(runtimePath: string, controllerDir: string, secret: string) {
        let loaders = new Loader(runtimePath, { suffix: '.controller.js', prefix: '', filter: [], root: controllerDir }).loaders;
        for (let [name, lib] of loaders) {
            if (lib.hasOwnProperty('default') && Object.keys(lib).length == 1) {
                lib.default.prototype[symbolRoutePrefix] = name;
            }
        }
        //不做校验的路由集合
        let unlessPath = [];
        //配置路由
        for (let [config, controller] of Route.__DecoratedRouters) {
            let controllers = Array.isArray(controller) ? controller : [controller];
            let prefixPath = config.target[symbolRoutePrefix];
            if (typeof prefixPath != 'string') continue;
            if (prefixPath && (!prefixPath.startsWith('/'))) {
                prefixPath = '/' + prefixPath;
            }
            //拼接api路由
            let routerPath = prefixPath + config.path;
            //将忽略路由集合
            if (config.unless) {
                unlessPath.push(new RegExp(`^${routerPath}`));
            }
            let middlewares: Array<Koa.Middleware> = [];
            if (config.mids) {
                middlewares = config.mids;
            }
            controllers.forEach((controller) => {
                this.router[HttpMethod.toString(config.method)](routerPath, ...middlewares, controller);
            });
            console.log(`加载路由 ${routerPath}`);
        }
        this.app.use(jwt({ secret: secret }).unless({ path: unlessPath }));//!!!
        this.app.use(this.router.routes());
        this.app.use(this.router.allowedMethods());
    }

}