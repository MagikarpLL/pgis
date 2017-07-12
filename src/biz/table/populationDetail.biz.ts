import { DBType } from "../../utils/db.util";
import { Context } from '../../utils/koa.util';
import Date from '../../utils/date.util';
import { SQL } from '../../utils/sql.util';
import { humpToLine, humpToLineTable } from '../../utils/split.util';
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
        formerUnitProperty, trainingIntention, economicTypeOfJob, workTypeSelection, salaryRequirements, rhflzMoveInDate, rhflzFormerAddress, updateUserId
 } = body;
    const data = {
        idNumber: idNumber,
        residenceId: residenceId,
        name: name,
        partisanCategory: partisanCategory,
        joinPartisanDate: joinPartisanDate,
        affiliate: affiliate,
        CPCmemberSource: CPCmemberSource,
        partisanRemark: partisanRemark,
        religionCategory: reliefCategory,
        believeDate: believeDate,
        activityVenue: activityVenue,
        disabilityCategory: disabilityCategory,
        disabilityLevel: disabilityLevel,
        disabilityReason: disabilityReason,
        disabilityId: disabilityId,
        destinationCountry: destinationCountry,
        goAbroadDate: goAbroadDate,
        goAbroadCategory: goAbroadCategory,
        rewardFormDate: rewardFormDate,
        licensingDate: licensingDate,
        rewardCertId: rewardCertId,
        rewardReason: rewardReason,
        rewardDate: rewardDate,
        rewardForm: rewardForm,
        rewardAmount: rewardAmount,
        accmulatedAmount: accmulatedAmount,
        violationDate: violationDate,
        returnCertIdDate: returnCertIdDate,
        returnAwardAmount: returnAwardAmount,
        accountNumber: accountNumber,
        levyAllowanceFormDate: levyAllowanceFormDate,
        levyReason: levyReason,
        allowanceAmount: allowanceAmount,
        levyDate: levyDate,
        paymentForm: paymentForm,
        levyAmount: levyAmount,
        accmulatedCollection: accmulatedCollection,
        endDate: endDate,
        handlePartyMember: handlePartyMember,
        handleCarde: handleCarde,
        levyProcedure: levyProcedure,
        lawEnforcementUnit: lawEnforcementUnit,
        enlistCategory: enlistCategory,
        enlistDate: enlistDate,
        enlistPlace: enlistPlace,
        workPlaceBeforeEnlist: workPlaceBeforeEnlist,
        armyPost: armyPost,
        leaveArmyDate: leaveArmyDate,
        resettlement: resettlement,
        leaveArmyReawrd: leaveArmyReawrd,
        retireDate: retireDate,
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
        RCStartDate: RCStartDate,
        removeRCDate: removeRCDate,
        drugDate: drugDate,
        detoxificationDate: detoxificationDate,
        drugCategory: drugCategory,
        detoxificationPlace: detoxificationPlace,
        releaseDate: releaseDate,
        professionStatus: professionStatus,
        acceptProcessCategory: acceptProcessCategory,
        originalSin: originalSin,
        investigation: investigation,
        disputeCategory: disputeCategory,
        investigationRemark: investigationRemark,
        laidOffCategory: laidOffCategory,
        laidOffDate: laidOffCategory,
        laidOffContactInfo: laidOffContactInfo,
        workPlaceBeforeLaidOff: workPlaceBeforeLaidOff,
        formerUnitProperty: formerUnitProperty,
        trainingIntention: trainingIntention,
        economicTypeOfJob: economicTypeOfJob,
        workTypeSelection: workTypeSelection,
        salaryRequirements: salaryRequirements,
        rhflzMoveInDate: rhflzMoveInDate,
        rhflzFormerAddress: rhflzFormerAddress,
        updateUserId: updateUserId,
        updateTime: createTime
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
    // console.log('jsobj is ', jsObj)
    return jsObj;
}

//获取单条数据
export async function findOneInDatabase(tableName: string, primaryKeyName: string, primaryKeyValue: string, db: any) {
    let sql: string;
    let DBtableName = humpToLineTable(tableName);
    switch (db.dbType) {
        case DBType.MYSQL:
            sql = `SELECT * FROM ${DBtableName} WHERE ${primaryKeyName} = '${primaryKeyValue}'`;
            break;
        case DBType.ORACLE:
            sql = `SELECT * FROM ${DBtableName}WHERE ${primaryKeyName} = '${primaryKeyValue}'`;
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
    tableName= humpToLineTable(tableName);
    sqlstr = sql.update(tableName, body, primaryKey, primaryKeyValue);
    const result = await db.edit(sqlstr);
}






