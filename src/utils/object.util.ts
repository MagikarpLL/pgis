import { lineToHump, humpToLine } from './split.util';

interface OBJECTS {
    [propName: string]: any;
}

export default class OBJECT {
    static toKeyUpper(obj: OBJECTS) {
        const newObj: OBJECTS = {};
        for (const key of Object.keys(obj)) {
            newObj[key.toUpperCase()] = obj[key];
        }
        return newObj;
    }

    static convertHGetAll(obj: OBJECTS) {
        const arr = [];
        for (const key of Object.keys(obj)) {
            let newObj: any = {};
            if (String(obj[key]).match(/^{.*}$/)) {
                newObj = JSON.parse(obj[key]);
            } else {
                newObj['key'] = key;
                newObj['value'] = obj[key];
            }
            arr.push(newObj);
        }
        return arr;
    }
    static lineToHump(obj: OBJECTS) {
        const newObj: OBJECTS = {};
        for (const key of Object.keys(obj)) {
            newObj[lineToHump(key)] = obj[key];
        }
        return newObj;
    }
   


    static toKeyLine(obj: OBJECTS) {
        const newObj: OBJECTS = {};
        for (const key of Object.keys(obj)) {
            let newKey = '';
            for (let i = 0; i < key.length; i++) {
                let char = key[i];
                if (char > 'A' && char < 'Z') {
                    char = char.toLowerCase();
                    newKey += '_' + char;
                } else {
                    newKey += char;
                }
            }
            newKey += '_';
            newObj[newKey] = obj[key];
        }
        return newObj;
    }

    static toKeyCamel(obj: OBJECTS) {
        const newObj: OBJECTS = {};
        for (let key of Object.keys(obj)) {
            // 将key转成小写
            key = key.toLowerCase();
            let newKey = '';
            let nextUpper = false;
            // 循环处理其余字符
            for (let i = 0; i < key.length; i++) {
                let char = key[i];
                if (nextUpper) {
                    char = char.toUpperCase();
                }
                if (char === '_') {
                    nextUpper = true;
                } else {
                    nextUpper = false;
                    newKey += char;
                }
            }
            newObj[newKey] = obj[key];
        }
        return newObj;
    }

    static convertObject(obj: OBJECTS, type: string[]) {
        const arr = [];
        for (const key of Object.keys(obj)) {
            const newObj: any = {};
            for (const item of type) {
                newObj[item] = obj[key][item]
            }
            arr.push(newObj);
        }
        return arr;
    }       
    static convertTree(obj: OBJECTS, keyName: string, parentName: string) {
        const arr = [];
        for (const key of Object.keys(obj)) {
            const newObj = obj[key];
            if (newObj['isEnabled'] === false) { continue; }
            if (newObj[parentName] === null || newObj[parentName].length === 0) {
                newObj['children'] = this.findChild(obj, newObj[keyName], keyName, parentName);
                arr.push(newObj);
            }
        }
        return arr;
    }

    private static findChild(obj: OBJECTS, keyValue: string, keyName: string, parentName: string) {
        console.log(`search ${keyValue} child`);
        const arr = [];
        for (const key of Object.keys(obj)) {
            const newObj = obj[key];
            if (newObj['isEnabled'] === false) { continue; }
            if (newObj[parentName] !== null && newObj[parentName] === keyValue) {
                console.log(`find ${newObj[keyName]}`)
                newObj['children'] = this.findChild(obj, newObj[keyName], keyName, parentName);
                arr.push(newObj);
            }
        }
        if (arr.length > 0) {
            return arr;
        } else {
            return null;
        }
    }

}

