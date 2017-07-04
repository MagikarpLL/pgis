import { DBType } from '../utils/db.util';

export class DBTypeChanger {
    useDBTypeChanger(DBtype: DBType, dataType: string, length?: number): any {
        var rs = '';
        console.log('input:'+length);
        switch (dataType) {
            case 'string':
                if (DBtype === DBType.MYSQL) {
                    if (length > 255) {
                        rs = 'longtext';
                    } else
                        rs = 'varchar';
                } else if (DBtype === DBType.ORACLE) {
                    rs = 'varchar2';
                }
                break;
            case 'int':
                if (DBtype === DBType.MYSQL) {
                    rs = 'int';
                } else if (DBtype === DBType.ORACLE) {
                    rs = 'number';
                }
                break;
            case 'double':
                if (DBtype === DBType.MYSQL) {
                    rs = 'double';
                } else if (DBtype === DBType.ORACLE) {
                    rs = 'number';
                }
                break;
            case 'timestamp':
                rs = 'timestamp';
                break;

            default:
                break;
        }
        return rs;
    }

    useProgramTypeChanger(dataType: string, length?: number): any {
        var rs = '';
        console.log(length);
        switch (dataType) {
            case 'longtext':
            case 'varchar2':
            case 'varchar':
                rs = 'string';
                break;
            case 'int':
            case 'bigint':
            case 'tinyint':
            case 'number':
                rs = 'int';
                break;
            case 'double':
                rs = 'double';
                break;
            case 'timestamp':
                rs = 'timestamp';
                break;
            default:
                rs = dataType;
                break;
        }
        return rs;
    }


}