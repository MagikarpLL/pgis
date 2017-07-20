import { DBType } from "../../utils/db.util";
import { Context } from '../../utils/koa.util';
import Date from '../../utils/date.util';
import { SQL } from '../../utils/sql.util';
import OBJECT from '../../utils/object.util'

//tb_populationdetailed
//insert

export async function insert(body: any, db: any, sql: SQL): Promise<any> {
    let sqlstr: string;
    let createTime = Date.getDateTime();
    let { idNumber, residenceId, name, partisanCategory, joinPartisanDate, affiliate, CPCmemberSource, partisanRemark, religionCategory,
        believeDate, activityVenue, disabilityCategory, disabilityLevel, disabilityReason, disabilityId, destinationCountry, goAbroadDate, goAbroadCategory,
        rewardFormDate, licensingDate, rewardCertId, rewardReason, rewardDate, rewardForm, rewardAmount, accmulatedAmount, violationDate, returnCertIdDate,
        returnAwardAmount, accountNumber, levyAllowanceFormDate, levyReason, allowanceAmount, levyDate, paymentForm, levyAmount, accmulatedCollection, endDate,
        handlePartyMember, handleCarde, levyProcedure, lawEnforcementUnit, enlistCategory, enlistDate, enlistPlace, workPlaceBeforeEnlist, armyPost, leaveArmyDate,
        resettlement, leaveArmyReawrd, retireDate, retireCategory, workPlaceBeforeRetire, socialReliefId, reliefCategory, socialReliefRemark, fiveOldContactInfo, fiveOldCategory,
        fiveOldSpeciality, charge, rectificationCategory, RCStartDate, removeRCDate, drugDate, detoxificationDate, drugCategory, detoxificationPlace, releaseDate, professionStatus,
        acceptProcessCategory, originalSin, investigation, disputeCategory, investigationRemark, laidOffCategory, laidOffDate, laidOffContactInfo, workPlaceBeforeLaidOff,
        formerUnitProperty, trainingIntention, economicTypeOfJob, workTypeSelection, salaryRequirements, rhflzMoveInDate, rhflzFormerAddress, updateUsrId
 } = body;
    if (idNumber == undefined || residenceId == undefined || name == undefined || updateUsrId == undefined) {
        throw "required params are not all defined,check your input";
    }
    const data = {
        idNumber: idNumber,
        residenceId: residenceId,
        name: name,
        partisanCategory: partisanCategory,
        joinPartisanDate: `to_date('${joinPartisanDate}','yyyy-mm-dd')`,
        affiliate: affiliate,
        CPCmemberSource: CPCmemberSource,
        partisanRemark: partisanRemark,
        religionCategory: reliefCategory,
        believeDate: `to_date('${believeDate}','yyyy-mm-dd')`,
        activityVenue: activityVenue,
        disabilityCategory: disabilityCategory,
        disabilityLevel: disabilityLevel,
        disabilityReason: disabilityReason,
        disabilityId: disabilityId,
        destinationCountry: destinationCountry,
        goAbroadDate: `to_date('${goAbroadDate}','yyyy-mm-dd')`,
        goAbroadCategory: goAbroadCategory,
        rewardFormDate: `to_date('${rewardFormDate}','yyyy-mm-dd')`,
        licensingDate: `to_date('${licensingDate}','yyyy-mm-dd')`,
        rewardCertId: rewardCertId,
        rewardReason: rewardReason,
        rewardDate: `to_date('${rewardDate}','yyyy-mm-dd')`,
        rewardForm: rewardForm,
        rewardAmount: rewardAmount,
        accmulatedAmount: accmulatedAmount,
        violationDate: `to_date('${violationDate}','yyyy-mm-dd')`,
        returnCertIdDate: `to_date('${returnCertIdDate}','yyyy-mm-dd')`,
        returnAwardAmount: returnAwardAmount,
        accountNumber: accountNumber,
        levyAllowanceFormDate: levyAllowanceFormDate,
        levyReason: levyReason,
        allowanceAmount: allowanceAmount,
        levyDate: `to_date('${levyDate}','yyyy-mm-dd')`,
        paymentForm: paymentForm,
        levyAmount: levyAmount,
        accmulatedCollection: accmulatedCollection,
        endDate: `to_date('${endDate}','yyyy-mm-dd')`,
        handlePartyMember: handlePartyMember,
        handleCarde: handleCarde,
        levyProcedure: levyProcedure,
        lawEnforcementUnit: lawEnforcementUnit,
        enlistCategory: enlistCategory,
        enlistDate: `to_date('${enlistDate}','yyyy-mm-dd')`,
        enlistPlace: enlistPlace,
        workPlaceBeforeEnlist: workPlaceBeforeEnlist,
        armyPost: armyPost,
        leaveArmyDate: `to_date('${leaveArmyDate}','yyyy-mm-dd')`,
        resettlement: resettlement,
        leaveArmyReawrd: leaveArmyReawrd,
        retireDate: `to_date('${retireDate}','yyyy-mm-dd')`,
        retireCategory: retireCategory,
        workPlaceBeforeRetire: workPlaceBeforeRetire,
        socialReliefId: socialReliefId,
        reliefCategory: reliefCategory,
        socialReliefRemark: socialReliefRemark,
        fiveOldContactInfo: fiveOldContactInfo,
        fiveOldCategory: fiveOldCategory,
        fiveOldSpeciality: fiveOldSpeciality,
        charge: charge,
        rectificationCategory: rectificationCategory,
        RCStartDate: `to_date('${RCStartDate}','yyyy-mm-dd')`,
        removeRCDate: `to_date('${removeRCDate}','yyyy-mm-dd')`,
        drugDate: `to_date('${drugDate}','yyyy-mm-dd')`,
        detoxificationDate: `to_date('${detoxificationDate}','yyyy-mm-dd')`,
        drugCategory: drugCategory,
        detoxificationPlace: detoxificationPlace,
        releaseDate: `to_date('${releaseDate}','yyyy-mm-dd')`,
        professionStatus: professionStatus,
        acceptProcessCategory: acceptProcessCategory,
        originalSin: originalSin,
        investigation: investigation,
        disputeCategory: disputeCategory,
        investigationRemark: investigationRemark,
        laidOffCategory: laidOffCategory,
        laidOffDate: `to_date('${laidOffDate}','yyyy-mm-dd')`,
        laidOffContactInfo: laidOffContactInfo,
        workPlaceBeforeLaidOff: workPlaceBeforeLaidOff,
        formerUnitProperty: formerUnitProperty,
        trainingIntention: trainingIntention,
        economicTypeOfJob: economicTypeOfJob,
        workTypeSelection: workTypeSelection,
        salaryRequirements: salaryRequirements,
        rhflzMoveInDate: `to_date('${rhflzMoveInDate}','yyyy-mm-dd')`,
        rhflzFormerAddress: rhflzFormerAddress,
        updateUsrId: updateUsrId,
        updateTime: `to_date('${createTime}','yyyy-mm-dd')`
    }
    sqlstr = sql.insert('tb_populationdetailed', data);
    const result = db.edit(sqlstr);
    return result;
}

//tb_populationdetailed
//idNumber
//delete
export async function remove(db: any, primaryKey: string, sql: SQL): Promise<any> {
    let sqlstr = sql.delete('tb_populationdetailed', 'idNumber', primaryKey);
    const result = await db.edit(sqlstr);
    return result;
}

//获取整表
export async function getWholeTable(tableName: string, db: any): Promise<any> {
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
    return jsObj;
}

//获取单条数据
export async function findOneInDatabase(tableName: string, primaryKeyName: string, primaryKeyValue: string, db: any) {
    let sql: string;
    switch (db.dbType) {
        case DBType.MYSQL:
            sql = `SELECT * FROM ${tableName} WHERE ${primaryKeyName} = '${primaryKeyValue}'`;
            break;
        case DBType.ORACLE:
            sql = `SELECT * FROM ${tableName}WHERE ${primaryKeyName} = '${primaryKeyValue}'`;
            break;
        default:
            throw new Error('DB not found!');
    }
    const result = await db.query(sql);
    const jsObj = JSON.parse(result.result);
    return jsObj[0];
}

//更新
export async function update(body: any, sql: SQL, tableName: string, primaryKey: string, primaryKeyValue: string, db: any): Promise<any> {
    let sqlstr: string;
    let { updateUsrId } = body;
    if (updateUsrId == undefined) {
        throw "Missing updateUsrId , check input";
    }
    sqlstr = sql.update(tableName, body, primaryKey, primaryKeyValue);
    const result = await db.edit(sqlstr);
}

//多参数查询
export async function multiSelect(tableName: string, body: any, sql: SQL, db: any) {
    let sqlstr = sql.multiSelect(tableName, body);
    const result = await db.query(sqlstr);
    const jsObj = JSON.parse(result.result);
    return jsObj;
}






