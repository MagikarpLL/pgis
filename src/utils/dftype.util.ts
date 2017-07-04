import { DBTypeChanger } from '../utils/dbtype.util';
import { DBType } from '../utils/db.util';

export interface IProsColumn {
    name: string;  // 列名
    label: string;
    type: string;  // 类型
    required: boolean;  //是否必填
    default: any;     //默认
    maxlength: number;//最大长度
    _$state_: number; //状态 0不变，1增加，2修改，3删除
}

export class DFTypeChanger {
    useDFTypeChanger(column: any): any {
        const dataColumn: any = {};

        for (const key in column) {
            // console.log('dftype:'+key);
            switch (key) {
                case 'name':
                    dataColumn.fieldName = column.name;
                    break;
                case 'type':
                    // console.log('aa:'+ dataColumn.length);
                    if (column.type=='boolean')  column.maxlength=1;
                    dataColumn.dataType = this.typeChanger(column.type, column.maxlength);
                    break;
                case 'maxlength':
                    dataColumn.length = column.maxlength===null?null:column.maxlength;
                    break;
                case 'default':
                    dataColumn.defaultValue = column.default;
                    break;
                case 'required':
                    dataColumn.notNull = column.required;
                    break;
                default:
                    break;
            }
        }
        dataColumn.primaryKey = false;
        dataColumn.unique = false;
        dataColumn._$state_ = column._$state_;
        if ( dataColumn.dataType==='int') dataColumn.length=`${dataColumn.length}`;

        return dataColumn;
    }

    usePgFormTypeChanger() {

    }

    typeChanger(oldType: string, length?: string): string {
        var rs = '';
        switch (oldType) {
            case 'enum':
                rs = 'string';
                break;
            case 'number':
                if (/^\d+$/.test(length)) {
                    rs = 'int';
                } else {
                    rs = 'double';
                }
                break;
            case 'text':
                rs = 'string';
                break;
            case 'date':
                rs = 'timestamp';
                break;
            case 'boolean':
                rs = 'int';
                break;
            default:
                break;
        }
        return rs;
    }

}