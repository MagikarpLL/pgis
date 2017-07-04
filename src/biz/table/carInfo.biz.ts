import { DBType } from "../../utils/db.util";
import { Context } from '../../utils/koa.util';
import UUID from "../../utils/uuid.util";
import Date from '../../utils/date.util';
import { SQL } from '../../utils/sql.util';
import OBJECT from '../../utils/object.util'

//car_info
//insert
export async function insert(body: any, db: any, sql:SQL): Promise<any> {
    let sqlstr: string;
    let uuid = UUID.genUUID();
    let createTime = Date.getDateTime();
    let { carLicenseNo, carName, carTypeName, empidCreate, ownerName, registerDate, status } = body;
    const data = {
        id: uuid,
        carLicenseNo: carLicenseNo,
        carName: carName,
        carTypeName: carTypeName,
        empidCreate: empidCreate,
        empidUpdate: empidCreate,
        ownerName: ownerName,
        registerDate: registerDate,
        status: status,
        tmCreate: createTime,
        tmUpdate: createTime
    }
    
    sqlstr = sql.insert('car_info', OBJECT.toKeyLine(data));
    const result = db.edit(sqlstr);
    return result;
}

//car_info
//id_
//delete
export async function remove(db: any, primaryKey: string, sql: SQL): Promise<any> {
    let sqlstr = sql.delete('car_info', 'id_', primaryKey);
    const result = await db.edit(sqlstr);
    return result;
}




