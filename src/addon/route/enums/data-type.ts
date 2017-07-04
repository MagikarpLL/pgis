enum DataType{
    STRING,
    NUMBER,
}

namespace DataType{
    export function toString(type: DataType): string{
        switch(type){
            case DataType.STRING:
                return 'string';
            case DataType.NUMBER:
                return 'number';
        }
    }
}

export default DataType;