import { DBType } from "../../utils/db.util";
import { Context } from '../../utils/koa.util';
import UUID from "../../utils/uuid.util";
import Date from '../../utils/date.util';


//problem_info
//create
export async function insert(body: any, db: any): Promise<any> {
    let sql: string;
    let uuid = UUID.genUUID();
    let createTime = Date.getDateTime();
    switch (db.dbType) {
        case DBType.MYSQL:
            let { chargePerson, empidCreate, logId, solution, solutionTime, type } = body;
            sql = `INSERT INTO problem_info values ('${uuid}','${chargePerson}','${empidCreate}','${empidCreate}','${logId}','${solution}',
                    '${solutionTime}','${createTime}','${createTime}','${type}')`;
            break;
        case DBType.ORACLE:
            sql = `SELECT * FROM problem_info`;
            break;
        default:
            throw new Error('DB not found!');
    }
    const result = await db.edit(sql);
    return result;
}

//problem_info
//id_
//delete
export async function remove(db: any, primaryKey: string): Promise<any> {
    let sql: string;
    sql = `DELETE FROM problem_info WHERE id_ = '${primaryKey}'`;
    const result = await db.edit(sql);
    return result;

}



