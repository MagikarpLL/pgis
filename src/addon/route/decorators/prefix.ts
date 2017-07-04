import { symbolRoutePrefix } from '../core/property';

export function prefix(path: string) {
    return (target: any) => {
        target.prototype[symbolRoutePrefix] = prefix;
    }
}