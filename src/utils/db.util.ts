import { Grpc } from "./grpc.util";
import config from '../config';

const grpcServer = new Grpc('DataBase.proto', 'DataBase');

export enum DBType {
    MYSQL = <any>'mysql',
    ORACLE = <any>'oracle',
}

export class DB {

    dbType: DBType;
    cur_db: string;

    constructor() {
        grpcServer.init('DBInfo');
    }

    async init(fn: Function) {
        const info = await this.getPros();
        const data = JSON.parse(info.result);
        this.dbType = data.database.toLowerCase();
        this.cur_db=data.cur_Db.CUR_DB;
        console.info(`${data.database} 数据库连接成功 ${data.url}`)
        fn();
    }

    //获取数据库基本属性
    async getPros(): Promise<any> {
        return await grpcServer.call('getPros', {});
    }

    //执行查询语句
    async query(sql: string): Promise<any> {
        if (sql.trim().substring(0, 6).toUpperCase() != "SELECT")
            throw new Error('不支持的SQL类型');
        if (config.showsql) console.log(`QUERY SQL: ${sql}`);
        return await grpcServer.call('query', { sql: sql });;
    }

    //执行保存，更新，修改语句
    async edit(sql: string): Promise<any> {
        if (sql.substring(0, 6).toUpperCase() == "SELECT")
            throw new Error('不支持的SQL类型');
        if (config.showsql) console.log(`EDIT SQL: ${sql}`);
        return await grpcServer.call('edit', { sql: sql });
    }
}
