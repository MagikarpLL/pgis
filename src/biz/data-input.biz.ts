import { DBType } from "../utils/db.util";
import { Context } from '../utils/koa.util';
import UUID from "../utils/uuid.util";
import Date from '../utils/date.util';
import { SQL } from '../utils/sql.util';
import { Grpc } from "../utils/grpc.util";

const grpcServer = new Grpc('InputData.proto', 'InputDataPackage');
//dataInput controller
//residence
export async function residence(body: any, db: any, sql: SQL): Promise<any> {
    grpcServer.init('InputDataService');
    let sqlExec = "";
    let residenceData = body.residence;
    for (let i in residenceData) {
        sqlExec = sqlExec + sql.insert("TB_RESIDENCE", residenceData[i]) + ";";
    }
    return await grpcServer.call('inputData', {inputDataSql : sqlExec});
}

//dataInput controller
//populationDetailed
export async function populationDetailed(body: any, db: any, sql: SQL): Promise<any> {
    grpcServer.init('InputDataService');
    let sqlExec = "";
    let populationDetailed = body.populationDetailed;
    for (let i in populationDetailed) {
        sqlExec = sqlExec + sql.insert("TB_POPULATIONDETAILED", populationDetailed[i]) + ";";
    }
    return await grpcServer.call('inputData', {inputDataSql : sqlExec});
}

//dataInput controller
//population
export async function population(body: any, db: any, sql: SQL): Promise<any> {
    grpcServer.init('InputDataService');
    let sqlExec = "";
    let population = body.population;
    for (let i in population) {
        sqlExec = sqlExec + sql.insert("TB_POPULATION", population[i]) + ";";
    }
    return await grpcServer.call('inputData', {inputDataSql : sqlExec});
}

//dataInput controller
//overSeaRelative
export async function overSeaRelative(body: any, db: any, sql: SQL): Promise<any> {
    grpcServer.init('InputDataService');
    let sqlExec = "";
    let overSeaRelative = body.overSeaRelative;
    for (let i in overSeaRelative) {
        sqlExec = sqlExec + sql.insert("TB_OVERSEASRELATIVE", overSeaRelative[i]) + ";";
    }
    return await grpcServer.call('inputData', {inputDataSql : sqlExec});
}