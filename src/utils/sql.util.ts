const sql = require('sql');
import { DBType } from './db.util';

interface Fields {
    [propName: string]: any;
}

export class SQL {

    init(type: DBType) {
        sql.setDialect(type);
    }

    create(obj: object): string {
        return sql.define(obj).create().toQuery().text;
    }

    addColumn(obj: object, fieldName: string, dataType: string, length: string): string {
        return sql.define(obj).alter().addColumn(`${fieldName}`, `${dataType}(${length})`).toString();
    }

    dropColumn(obj: object, fieldName: string): string {
        return sql.define(obj).alter().dropColumn(`${fieldName}`).toString();
    }

    renameTable(obj: object, newTableName: string): string {
        return sql.define(obj).alter().rename(`${newTableName}`).toString();
    }

    changeColumn(tableName: string, columns: any): string {
        let sqlstring = `ALTER TABLE ${tableName} `;
        for (const column of columns) {
            // console.log(column.fieldName);
            const status: number = column._$state_;
            // console.log(status);
            switch (status) {
                // 不变
                case 0:
                    break;
                // 增加行
                case 1:
                    sqlstring += `ADD COLUMN ${column.fieldName} `;
                    if (column.dataType === 'timestamp') {
                        sqlstring += `timestamp `;
                    } else if (column.length !== undefined && column.length != null) {
                        if (column.defaultValue != null) {
                            if (column.length < (column.defaultValue).length) {
                                column.length = (column.defaultValue).length;
                            }
                        }
                        const type = `${column.dataType}(${(column.length).toString().split('.').join(',')}) `
                        sqlstring += `${type} `;
                    } else {
                        sqlstring += `${column.dataType} `;
                    }

                    if (column.notNull) {
                        sqlstring += `NOT NULL `;
                    } else {
                        sqlstring += `NULL `;
                    }

                    if ((column.defaultValue !== undefined && column.defaultValue != null) && column.dataType !== 'timestamp') {
                        sqlstring += `DEFAULT '${column.defaultValue}'`;
                    }
                    sqlstring += `, `;
                    break;
                // 修改行
                case 2:
                    sqlstring += `MODIFY COLUMN ${column.fieldName} `;
                    if (column.dataType === 'timestamp') {
                        sqlstring += `timestamp(0) `;
                    } else if (column.length !== undefined && column.length != null) {
                        if (column.defaultValue != null) {
                            if (column.length < (column.defaultValue).length) {
                                column.length = (column.defaultValue).length;
                            }
                        }
                        const type = `${column.dataType}(${(column.length).toString().split('.').join(',')}) `;
                        sqlstring += `${type} `;
                    } else {
                        sqlstring += `${column.dataType} `;
                    }

                    if (column.notNull && column.dataType !== 'timestamp') {
                        sqlstring += `NOT NULL `;
                    } else {
                        sqlstring += `NULL `;
                    }

                    if ((column.defaultValue !== undefined && column.defaultValue != null) && column.dataType !== 'timestamp') {
                        sqlstring += `DEFAULT '${column.defaultValue}'`;
                    }

                    sqlstring += `, `;
                    break;
                // 删除行
                case 3:
                    sqlstring += `DROP COLUMN ${column.fieldName}, `;
                    break;

                default:
                    break;
            }
        }
        return sqlstring.substring(0, sql.length - 2);
    }

    select(obj: any) {
        return sql.select(obj);
    }

    insert(name: string, fields: Fields): string {
        const fds: string[] = [];
        const values: string[] = [];
        for (const field of Object.keys(fields)) {
            if (fields[field] === undefined) { continue };
            if (fields[field].indexOf('to_date')==0) {
                fds.push(field);
                values.push(`${fields[field]}`)
            }
            else {
                fds.push(field);
                values.push(`'${fields[field]}'`)
            }
        }
        return `INSERT INTO ${name}(${fds.join(',')}) VALUES (${values.join(',')})`;
    }

    update(name: string, fields: Fields, id: string, value: string): string {
        let sqlstring = `UPDATE ${name} ta SET `;
        for (const field of Object.keys(fields)) {
            if (fields[field] === undefined) { continue }
            sqlstring += `ta.${field}='${fields[field]}',`;
        }
        sqlstring = sqlstring.substring(0, sqlstring.length - 1);
        sqlstring += ` WHERE ta.${id}='${value}'`;
        return sqlstring;
    }

    delete(name: string, id: string, value: string): string {
        return `DELETE FROM ${name} WHERE ${id}='${value}'`;
    }

    findOne(name: string, id: string, value: string): string {
        return `SELECT * FROM ${name} WHERE ${id}='${value}'`;
    }

    multiSelect(name: string, fields: Fields) {
        let sqlstring = `SELECT * from ${name} ta WHERE`;
        for (const field of Object.keys(fields)) {
            if (fields[field] === undefined) { continue }
            sqlstring += ` ta.${field}='${fields[field]}' and `;
        }
        sqlstring = sqlstring.substring(0, sqlstring.length - 5);
        return sqlstring;
    }

}
