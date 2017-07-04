'use strict';
// KOA框架核心对象
import * as Koa from 'koa';
// 转化POST数据中间件
import * as bodyParser from 'koa-bodyparser';
// 跨域中间件
import * as cors from 'kcors';
// 全局配置文件
import config from './config';
// 路由插件
import { Route } from './addon/route';
// 数据库工具类
import { DB } from './utils/db.util';
// SQL工具类
import { SQL } from './utils/sql.util';
// Context接口
import { Context, init } from './utils/koa.util';
// koa static

import * as Http from 'http';

import * as SocketIO from 'socket.io';

const Serve = require('koa-static');


const app = new Koa();
const router = new Route(app);
const server = Http.createServer(app.callback());
const io = SocketIO(server);
console.log(config.root);

const db = new DB();
const sql = new SQL();
db.init(() => sql.init(db.dbType));

app.use(bodyParser());
app.use(cors());
app.use(Serve(config.ftproot));

app.use(async (ctx: Context, next: Function) => {
    ctx.io = io;
    ctx.db = db;
    ctx.sql = sql;
    init(ctx);
    await next();
});

router.routes(__dirname, 'controller', config.jwt.secret);

io.on('connection', function () {
    console.info(`Socket已连接`);
});
server.listen(config.port, config.host, () => {
    console.info(`服务端已经启动 http://${config.host}:${config.port}`);
});