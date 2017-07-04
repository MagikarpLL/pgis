
export function lineToHump(str: String) {
    var tem: String = str.toLowerCase();
    var res: String[] = tem.split('_');
    let result = '';
    for (var i = 0; i < res.length; i++) {
        if (i == 0) {
            result += res[i];
            continue;
        }
        result += res[i].substr(0, 1).toUpperCase() + res[i].slice(1);
    }
    // console.log(result);
    return result;
}

export function humpToLine(str: String) {
    let result = str.replace(/([A-Z])/g,"_$1").toLowerCase();
    result = result+'_';
    return result;
}

export function humpToLineTable(str: String) {
    let result = str.replace(/([A-Z])/g,"_$1").toLowerCase();
    return result;
}


