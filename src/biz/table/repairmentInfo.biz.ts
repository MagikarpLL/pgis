import { DBType } from "../../utils/db.util";
import { Context } from '../../utils/koa.util';
import UUID from "../../utils/uuid.util";
import Date from '../../utils/date.util';
import { SQL } from '../../utils/sql.util';
import OBJECT from '../../utils/object.util'

//repairment_info
//insert
export async function insert(body: any, db: any, sql: SQL): Promise<any> {
    let sqlstr: string;
    let uuid = UUID.genUUID();
    let createTime = Date.getDateTime();
    let { communityName, description, ownerName, empidCreate, propertyId, registerDate, status,repairer,repairmentTypeNo,tel } = body;
    const data = {
        id: uuid,
        communityName: communityName,
        description: description,
        empidCreate: empidCreate,
        empidUpdate: empidCreate,
        ownerName: ownerName,
        propertyId: propertyId,
        registerDate: registerDate,
        repairer:repairer,
        repairmentTypeNo:repairmentTypeNo,
        status: status,
        tel:tel,
        tmCreate: createTime,
        tmUpdate: createTime
    }
    sqlstr = sql.insert('repairment_info', OBJECT.toKeyLine(data));
    const result = db.edit(sqlstr);
    return result;
}

//repairment_info
//id_
//delete
export async function remove(db: any, primaryKey: string, sql: SQL): Promise<any> {
    let sqlstr = sql.delete('repairment_info', 'id_', primaryKey);
    const result = await db.edit(sqlstr);
    return result;
}




