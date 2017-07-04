import { Context } from '../utils/koa.util';
import { DBType } from '../utils/db.util';
import { DBTypeChanger } from '../utils/dbtype.util';

const changer = new DBTypeChanger();

export interface IDataColumn {
    fieldName: string;  // 列名
    dataType: string;  // 类型
    length?: number;  //长度
    defaultValue?: any;     //默认
    primaryKey: boolean; //是否主键
    notNull: boolean; //是否不为空
    unique: boolean; // 是否唯一
}

export interface INewDataColumn extends IDataColumn {
    _$state_: number; //状态 0不变，1增加，2修改，3删除
}



export async function getTables(ctx: Context): Promise<object> {
    let sql: string;
    switch (ctx.db.dbType) {
        case DBType.MYSQL:
            sql = `SELECT TABLE_SCHEMA,TABLE_NAME,CREATE_TIME,ENGINE from information_schema.tables where table_type='base table' and table_schema='${ctx.db.cur_db}'`;
            break;
        case DBType.ORACLE:
            sql = 'SELECT u1.USERNAME,u2.TABLE_NAME,u2.TABLESPACE_NAME FROM user_users u1,user_tables u2';
            break;
        default:
            throw new Error('DB not found!');
    }
    const obj = await ctx.db.query(sql);
    return JSON.parse(obj.result);
}

/**
 * 创建新表
 * @param ctx 
 * @param name 
 * @param description 
 * @param columns 
 */
export async function createTable(ctx: Context, name: string, description: string, columns: IDataColumn[]): Promise<string> {
    const dataColumns: any = {};
    for (const col of columns) {
        col.dataType = changer.useDBTypeChanger(ctx.db.dbType, col.dataType, col.length);
         if (col.length===null){
            if (col.dataType==='int'){
                col.length=11;
            }else if (col.dataType==='timestamp'){
                col.length=0;
            }else if (col.dataType==='varchar'){
                col.length=255;
            }
        }
        dataColumns[col.fieldName] = {
            dataType: col.dataType === 'longtext' ? `${col.dataType}` : `${col.dataType}(${(col.length).toString().split('.').join(',')})`,
            defaultValue: col.defaultValue === null ? undefined : col.defaultValue,
            primaryKey: col.primaryKey,
            notNull: col.notNull,
            unique: col.unique
        };
    }
    const obj = {
        name: name,
        description: description,
        columns: dataColumns
    };
    let sql = ctx.sql.create(obj);
    // console.log(description);
    switch (ctx.db.dbType) {
        case DBType.MYSQL:
            sql = sql + `COMMENT='${description}'`;
            console.log(sql);
            break;
        case DBType.ORACLE:
            sql = sql + `; COMMENT ON TABLE ${name} IS '${description}'`;
            console.log(sql);
            break;
        default:
            throw new Error('DB not found!');
    }
    const rs = await ctx.db.edit(sql);
    return JSON.parse(rs.result);

}

export async function deleteTable(ctx: Context, tableName: any): Promise<object> {
    let sql: string;
    switch (ctx.db.dbType) {
        case DBType.MYSQL:
            sql = `drop table ${tableName}`;
            break;
        case DBType.ORACLE:
            sql = `drop table "${tableName}"`;
            break;
        default:
            throw new Error('DB not found!');
    }
    const obj = await ctx.db.edit(sql);
    return JSON.parse(obj.result);
}

/**
 * 修改表结构
 * @param ctx 
 * @param name 
 * @param newColumns 
 */
export async function alterTable(ctx: Context, name: string, newColumns: INewDataColumn[]): Promise<string> {
    //从客户端获取的新更新的数据
    const newDataColumns: INewDataColumn[] = [];
    for (const col of newColumns) {
        col.dataType = changer.useDBTypeChanger(ctx.db.dbType, col.dataType, col.length);
        newDataColumns.push(col);
    }

    const obj = await ctx.db.edit(ctx.sql.changeColumn(name, newDataColumns));
    return JSON.parse(obj.result);

}

export async function queryTable(ctx: Context, name: string): Promise<object> {
    let data: object;
    switch (ctx.db.dbType) {
        case DBType.MYSQL:
            data = await mysqlGetInfo(ctx, name);
            break;
        case DBType.ORACLE:
            data = await oracleGetInfo(ctx, name);
            break;
        default:
            throw new Error('DB not found!');
    }
    return data;
}

async function oracleGetInfo(ctx: Context, name: string): Promise<object> {
    const tbsql = `SELECT COMMENTS FROM ALL_TAB_COMMENTS WHERE TABLE_NAME= '${name}'`;
    const colsql = `SELECT TA.COLUMN_NAME,TA.DATA_TYPE,TA.CHAR_LENGTH,TA.NULLABLE,TA.DATA_DEFAULT,TB.COMMENTS FROM USER_TAB_COLS TA,all_col_comments TB
     WHERE TA.TABLE_NAME = '${name}' AND TA.TABLE_NAME = TB.TABLE_NAME AND TA.COLUMN_NAME = TB.COLUMN_NAME`;
    const pksql = `SELECT au.CONSTRAINT_TYPE,cu.COLUMN_NAME FROM USER_CONS_COLUMNS cu,USER_CONSTRAINTS au WHERE	au.TABLE_NAME = '${name}'
     AND cu.CONSTRAINT_NAME = au.CONSTRAINT_NAME AND (AU.CONSTRAINT_TYPE = 'P' OR AU.CONSTRAINT_TYPE = 'U')`;
    let [tbdata, coldata, pkdata] = await Promise.all([
        ctx.db.query(tbsql),
        ctx.db.query(colsql),
        ctx.db.query(pksql)
    ])
    const pkus = JSON.parse(pkdata.result);
    const cols = JSON.parse(coldata.result);
    let columns: any = [];
    for (const col of cols) {
        col.DATA_TYPE = changer.useProgramTypeChanger(col.DATA_TYPE);
        let data = {
            fieldName: col.COLUMN_NAME === undefined ? null : col.COLUMN_NAME,
            dataType: col.DATA_TYPE === undefined ? null : col.DATA_TYPE,
            defaultValue: col.DATA_DEFAULT === undefined ? null : col.DATA_DEFAULT,
            notNull: col.NULLABLE === 'Y' ? false : true,
            unique: false,
            primaryKey: false,
            length: col.CHAR_LENGTH === undefined ? null : col.CHAR_LENGTH,
            comments: col.COMMENTS === undefined ? null : col.COMMENTS
        }
        for (const pku of pkus) {
            if (pku.COLUMN_NAME === data.fieldName) {
                if (pku.CONSTRAINT_TYPE === 'P') {
                    data.primaryKey = true;
                } else if (pku.CONSTRAINT_TYPE === 'U') {
                    data.unique = true;
                }
            }
        }
        columns.push(data)
    }

    const result = {
        name: name,
        description: JSON.parse(tbdata.result)[0].COMMENTS === undefined ? null : JSON.parse(tbdata.result)[0].COMMENTS,
        columns: columns
    };
    return result;
}

async function mysqlGetInfo(ctx: Context, name: string): Promise<object> {
    const colsql = `SELECT DISTINCT COLUMN_NAME,DATA_TYPE,CHARACTER_MAXIMUM_LENGTH,COLUMN_DEFAULT,COLUMN_KEY,IS_NULLABLE,COLUMN_COMMENT from information_schema.columns where table_name='${name}' and TABLE_SCHEMA='${ctx.db.cur_db}'`
    const tbsql = `SELECT TABLE_COMMENT FROM information_schema.TABLES WHERE TABLE_NAME='${name}'`
    let [tbdata, coldata] = await Promise.all([
        ctx.db.query(tbsql),
        ctx.db.query(colsql),
    ])
    const cols = JSON.parse(coldata.result);
    let columns: any = [];
    for (const col of cols) {
        // console.log('type：' + col.DATA_TYPE);
        col.DATA_TYPE = changer.useProgramTypeChanger(col.DATA_TYPE);
        let data = {
            fieldName: col.COLUMN_NAME === undefined ? null : col.COLUMN_NAME,
            dataType: col.DATA_TYPE === undefined ? null : col.DATA_TYPE,
            defaultValue: col.COLUMN_DEFAULT === undefined ? null : col.COLUMN_DEFAULT,
            notNull: col.IS_NULLABLE === 'NO' ? true : false,
            unique: col.COLUMN_KEY === 'UNI' ? true : false,
            primaryKey: col.COLUMN_KEY === 'PRI' ? true : false,
            length: col.CHARACTER_MAXIMUM_LENGTH === undefined ? null : col.CHARACTER_MAXIMUM_LENGTH,
            comments: col.COLUMN_COMMENT === undefined ? null : col.COLUMN_COMMENT
        }
        columns.push(data)
    }

    const result = {
        name: name,
        description: JSON.parse(tbdata.result)[0].TABLE_COMMENT === undefined ? null : JSON.parse(tbdata.result)[0].TABLE_COMMENT,
        columns: columns
    };
    return result;
}

