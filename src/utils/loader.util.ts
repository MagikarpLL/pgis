import * as path from 'path';
import * as fs from 'fs';

export interface Options {
    suffix?: string;
    prefix?: string;
    filter?: any[];
    root: string;
}

export default class Loader {

    Options: Options;

    public loaders: Map<string, any>

    runtimePath: string;

    constructor(runtimePath: string, options: Options) {
        this.runtimePath = runtimePath;
        this.loaders = this.loader(options);
    }

    public walk(dir: string): string[] {

        dir = path.resolve(this.runtimePath, dir);

        const exist = fs.existsSync(dir);
        if (!exist) {
            return;
        }

        const files = fs.readdirSync(dir);
        let list: string[] = [];

        for (let file of files) {
            if (fs.statSync(path.resolve(dir, file)).isDirectory()) {
                list = list.concat(this.walk(path.resolve(dir, file)));
            } else {
                list.push(path.resolve(dir, file));
            }
        }

        return list;
    }

    loader(options: Options) {

        options.suffix = options.suffix || '.js';
        options.prefix = options.prefix || '';
        options.filter = options.filter || [];

        const paths = this.walk(options.root);
        if (!paths) {
            return;
        }

        let loaders: Map<string, any> = new Map();
        for (let key in paths) {

            let name = path.relative(path.resolve(this.runtimePath, options.root), paths[key]);
            let regExp = new RegExp(`${options.suffix}$`);

            if (regExp.test(name)) {
                name = name.slice(0, name.lastIndexOf(options.suffix));

                options.filter.forEach(function (v, i) {
                    name = name.replace(v, '');
                });

                name = options.prefix + name;
                name = name.replace(/\\/g, '/');

                let lib = require(paths[key]);

                loaders.set(name, lib);
            }
        }

        return loaders;
    }

    concat(arr1: any[], arr2: any[]) {

        let arr = arr1;

        for (let key in arr2) {
            arr[key] = arr2[key];
        }

        return arr;
    }
}
