import { DBType } from "../utils/db.util";
import { Context } from '../utils/koa.util';
import UUID from "../utils/uuid.util";
import Date from '../utils/date.util';
import { SQL } from '../utils/sql.util';

//buildingId
export async function building(body: any, db: any, sql: SQL): Promise<any> {
    let buildingId = body.buildingId;
    let sqlExec = `SELECT   
       COUNT(CASE  
               WHEN popu.gender  IN ('男') THEN  
                '男'  
             END) 男,
       COUNT(CASE  
               WHEN popu.gender  IN ('女') THEN  
                '女'  
             END) 女,
       COUNT(CASE  
               WHEN popu.maritalstatus  IN ('已婚') THEN  
                '已婚'  
             END) 已婚,
       COUNT(CASE  
               WHEN popu.maritalstatus  IN ('未婚') THEN  
                '未婚'  
             END) 未婚,
       COUNT(CASE  
               WHEN popu.educationaldegree  IN ('大学生') THEN  
                '大学生'  
             END) 大学生,
       COUNT(CASE  
               WHEN popu.educationaldegree  IN ('高中') THEN  
                '高中'  
             END) 高中,
       COUNT(CASE  
               WHEN popu.educationaldegree  IN ('初中') THEN  
                '初中'  
             END) 初中,
       COUNT(CASE  
               WHEN popu.educationaldegree  IN ('专科') THEN  
                '专科'  
             END) 专科,
       COUNT(CASE  
               WHEN popu.educationaldegree  IN ('初中以下') THEN  
                '初中以下'  
             END) 初中以下,
       COUNT(CASE  
               WHEN popu.politicalstatus  IN ('党员') THEN  
                '党员'  
             END) 党员,      
       COUNT(CASE  
               WHEN popu.politicalstatus  IN ('团员') THEN  
                '团员'  
             END) 团员,               
       COUNT(CASE  
               WHEN popu.politicalstatus  IN ('群众') THEN  
                '群众'  
             END) 群众,               
       COUNT(CASE  
               WHEN popu.typeofhousehold  IN ('非农') THEN  
                '非农'  
             END) 非农,               
       COUNT(CASE  
               WHEN popu.typeofhousehold  IN ('农业') THEN  
                '农业'  
             END) 农业,                                                                                       
       COUNT(CASE  
               WHEN popu.ethnicity  IN ('汉族') THEN  
                '汉族'  
             END) 汉族,    
       COUNT(CASE  
               WHEN popu.ethnicity  IN ('满族') THEN  
                '满族'  
             END) 满族,             
       COUNT(CASE  
               WHEN popu.ethnicity  IN ('壮族') THEN  
                '壮族'  
             END) 壮族,             
       COUNT(CASE  
               WHEN popu.ethnicity  IN ('藏族') THEN  
                '藏族'  
             END) 藏族,             
       COUNT(CASE  
               WHEN popu.ethnicity  IN ('其他民族') THEN  
                '其他民族'  
             END) 其他民族                                             
        from TB_PROPERTYGIS gis, Tb_Residence res, Tb_Population popu where gis.roomid = res.roomid 
        and res.householdid = popu.residenceid and gis.buildingId = ${ buildingId}`;    
    const result = await db.query(sqlExec);
    const jsObj = JSON.parse(result.result);
    return jsObj;
}

//unit
export async function unit(body: any, db: any, sql: SQL): Promise<any> {
    let buildingId = body.buildingId;
    let unit = body.unit;
    let sqlExec = `SELECT   
       COUNT(CASE  
               WHEN popu.gender  IN ('男') THEN  
                '男'  
             END) 男,
       COUNT(CASE  
               WHEN popu.gender  IN ('女') THEN  
                '女'  
             END) 女,
       COUNT(CASE  
               WHEN popu.maritalstatus  IN ('已婚') THEN  
                '已婚'  
             END) 已婚,
       COUNT(CASE  
               WHEN popu.maritalstatus  IN ('未婚') THEN  
                '未婚'  
             END) 未婚,
       COUNT(CASE  
               WHEN popu.educationaldegree  IN ('大学生') THEN  
                '大学生'  
             END) 大学生,
       COUNT(CASE  
               WHEN popu.educationaldegree  IN ('高中') THEN  
                '高中'  
             END) 高中,
       COUNT(CASE  
               WHEN popu.educationaldegree  IN ('初中') THEN  
                '初中'  
             END) 初中,
       COUNT(CASE  
               WHEN popu.educationaldegree  IN ('专科') THEN  
                '专科'  
             END) 专科,
       COUNT(CASE  
               WHEN popu.educationaldegree  IN ('初中以下') THEN  
                '初中以下'  
             END) 初中以下,
       COUNT(CASE  
               WHEN popu.politicalstatus  IN ('党员') THEN  
                '党员'  
             END) 党员,      
       COUNT(CASE  
               WHEN popu.politicalstatus  IN ('团员') THEN  
                '团员'  
             END) 团员,               
       COUNT(CASE  
               WHEN popu.politicalstatus  IN ('群众') THEN  
                '群众'  
             END) 群众,               
       COUNT(CASE  
               WHEN popu.typeofhousehold  IN ('非农') THEN  
                '非农'  
             END) 非农,               
       COUNT(CASE  
               WHEN popu.typeofhousehold  IN ('农业') THEN  
                '农业'  
             END) 农业,                                                                                       
       COUNT(CASE  
               WHEN popu.ethnicity  IN ('汉族') THEN  
                '汉族'  
             END) 汉族,    
       COUNT(CASE  
               WHEN popu.ethnicity  IN ('满族') THEN  
                '满族'  
             END) 满族,             
       COUNT(CASE  
               WHEN popu.ethnicity  IN ('壮族') THEN  
                '壮族'  
             END) 壮族,             
       COUNT(CASE  
               WHEN popu.ethnicity  IN ('藏族') THEN  
                '藏族'  
             END) 藏族,             
       COUNT(CASE  
               WHEN popu.ethnicity  IN ('其他民族') THEN  
                '其他民族'  
             END) 其他民族                                             
        from TB_PROPERTYGIS gis, Tb_Residence res, Tb_Population popu where gis.roomid = res.roomid 
        and res.householdid = popu.residenceid and gis.buildingId = ${ buildingId} and gis.unit = ${unit}`;       
    const result = await db.query(sqlExec);
    const jsObj = JSON.parse(result.result);
    return jsObj;
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
    const result = await db.query(sqlExec);
    const jsObj = JSON.parse(result.result);
    return jsObj;

}
