import { DBType } from "../utils/db.util";
import { Context } from '../utils/koa.util';
import OBJECT from '../utils/object.util';
import { humpToLine, humpToLineTable } from '../utils/split.util';

//整表查
export async function getWholeTable(query: any, db: any): Promise<any> {
    let tableName = humpToLineTable(query.tableName);
    let sql: string;
    switch (db.dbType) {
        case DBType.MYSQL:
            sql = `SELECT * FROM ${tableName}`;
            break;
        case DBType.ORACLE:
            sql = `SELECT * FROM ${tableName}`;
            break;
        default:
            throw new Error('DB not found!');
    }
    const result = await db.query(sql);
    const jsObj = JSON.parse(result.result);
    console.log('jsobj is ', jsObj);
    let fi = [];
    for (var key in jsObj) {
        fi.push(OBJECT.lineToHump(jsObj[key]));
    }
    console.log(fi);
    return fi;
}

//多参查询
export async function retrieve(query: any, db: any, tableName: string) {
    let sql: string;
    switch (db.dbType) {
        case DBType.MYSQL:
            sql = retrieveMySql(query, tableName);
            break;
        case DBType.ORACLE:
            sql = `SELECT * FROM ${tableName}`;
            break;
        default:
            throw new Error('DB not found!');
    }
    const result = await db.query(sql);
    const jsObj = JSON.parse(result.result);
    let fi = [];
    for (var key in jsObj) {
        fi.push(OBJECT.lineToHump(jsObj[key]));
    }
    console.log(fi);
    return fi;
}

export async function findOneInDatabase(tableName: string, primaryKeyName: string, primaryKeyValue: string, db: any) {
    let sql: string;
    switch (db.dbType) {
        case DBType.MYSQL:
            sql = `SELECT * FROM ${tableName} WHERE ${primaryKeyName} = '${primaryKeyValue}'`;
            break;
        case DBType.ORACLE:
            sql = `SELECT * FROM ${tableName}`;
            break;
        default:
            throw new Error('DB not found!');
    }
    const result = await db.query(sql);
    const jsObj = JSON.parse(result.result);   
    return  OBJECT.lineToHump(jsObj[0]);
}

//多参更新
export async function update(body: any, db: any, tableName: string, primaryKey: string, primaryKeyValue: string, empidUpdate: string): Promise<any> {
    let sql: string;
    switch (db.dbType) {
        case DBType.MYSQL:
            sql = updateMySql(body, tableName, primaryKey, primaryKeyValue, empidUpdate);
            break;
        case DBType.ORACLE:
            sql = `SELECT * FROM ${tableName}`;
            break;
        default:
            console.log("dbType:" + db.dbType);
            throw new Error('DB not found!');
    }
    const result = await db.edit(sql);
}


function updateMySql(body: any, tableName: string, primaryKey: string, primaryKeyValue: string, empidUpdate: string): string {
    let sql = `UPDATE  ${tableName}  SET empid_update_ = '${empidUpdate}'`;
    let params = body;
    console.log(params);
    let length = getJSONLength(params) / 2;
    console.log('length' + length);
    let counter = 0;
    for (let i = 1; i <= length; i++) {

        console.log('i = ' + i);

        let columnName = `columnName${i}`;
        let columnValue = `columnValue${i}`;
        let temp =  humpToLine(params[columnName]);

        if (temp === 'empid_create_') {
            throw 'you are not allow to change empidCreate';
        }

        sql = sql + `, ${temp} = '${params[columnValue]}' `;

    }

    sql = sql + ` WHERE ${primaryKey} = '${primaryKeyValue}'`;

    return sql;
}

function retrieveMySql(query: any, tableName: string): string {
    let sql = `SELECT * FROM ${tableName} WHERE`;
    let params = query;
    console.log(params);
    let length = getJSONLength(params) / 2;
    console.log('length' + length);
    for (let i = 1; i <= length; i++) {

        console.log('i = ' + i);

        let columnName = `columnName${i}`;
        let columnValue = `columnValue${i}`;
        let temp =  humpToLine(params[columnName]);
        if (i == 1) {      
            sql = sql + ` ${temp} = '${params[columnValue]}' `;
        } else {
            sql = sql + `AND ${temp} = '${params[columnValue]}' `;
        }
    }

    return sql;
}

function getJSONLength(object: any): number {
    let JSONLength = 0;
    for (var key in object) {
        console.log(object[key]);
        JSONLength++;
    }
    return JSONLength;
}

