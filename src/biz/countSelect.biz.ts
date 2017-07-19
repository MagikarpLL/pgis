import { DBType } from "../utils/db.util";
import { Context } from '../utils/koa.util';
import UUID from "../utils/uuid.util";
import Date from '../utils/date.util';
import { SQL } from '../utils/sql.util';


//buildingId
export async function building(body: any, db: any, sql: SQL): Promise<any> {
    let sqlExec = "select * from TB_PROPERTYGIS gis, Tb_Residence res, Tb_Population popu where gis.roomid = res.roomid and res.householdid = popu.residenceid";
    let buildingId = body.buildingId;
    sqlExec = ` select popu.idNumber, popu.residenceId, popu.name, popu.gender, popu.ethnicity, popu.birthday,
    popu.educationalDegree, popu.politicalStatus, popu.maritalStatus, popu.relationToHouseholder, popu.typeOfHousehold,
    popu.ancestralNativePlace, popu.residentialAddress, popu.verificationDate, popu.issueCertificateDate, popu.speciality,
    popu.pets, popu.workplace, popu.companyProperty, popu.personnelCategory, popu.peopleLivehoodCategory
    from TB_PROPERTYGIS gis, Tb_Residence res, Tb_Population popu where gis.roomid = res.roomid 
    and res.householdid = popu.residenceid and gis.buildingId = ${ buildingId}`;
    return await db.query(sqlExec);
}

//unit
export async function unit(body: any, db: any, sql: SQL): Promise<any> {
    let buildingId = body.buildingId;
    let unit = body.unit;
    let sqlExec = ` select popu.idNumber, popu.residenceId, popu.name, popu.gender, popu.ethnicity, popu.birthday,
    popu.educationalDegree, popu.politicalStatus, popu.maritalStatus, popu.relationToHouseholder, popu.typeOfHousehold,
    popu.ancestralNativePlace, popu.residentialAddress, popu.verificationDate, popu.issueCertificateDate, popu.speciality,
    popu.pets, popu.workplace, popu.companyProperty, popu.personnelCategory, popu.peopleLivehoodCategory
    from TB_PROPERTYGIS gis, Tb_Residence res, Tb_Population popu where gis.roomid = res.roomid 
    and res.householdid = popu.residenceid and gis.buildingId = ${ buildingId}  AND gis.unit = ${unit} `;
    return await db.query(sqlExec);
}

//room
export async function room(body: any, db: any, sql: SQL): Promise<any> {
    let buildingId = body.buildingId;
    let unit = body.unit;
    let room = body.room;
    let sqlExec = `  select popu.idNumber, popu.residenceId, popu.name, popu.gender, popu.ethnicity, popu.birthday,
    popu.educationalDegree, popu.politicalStatus, popu.maritalStatus, popu.relationToHouseholder, popu.typeOfHousehold,
    popu.ancestralNativePlace, popu.residentialAddress, popu.verificationDate, popu.issueCertificateDate, popu.speciality,
    popu.pets, popu.workplace, popu.companyProperty, popu.personnelCategory, popu.peopleLivehoodCategory
    from TB_PROPERTYGIS gis, Tb_Residence res, Tb_Population popu where gis.roomid = res.roomid 
    and res.householdid = popu.residenceid and gis.buildingId = ${ buildingId}  AND gis.unit = ${unit} AND gis.room = ${room} `;
    return await db.query(sqlExec);
}
