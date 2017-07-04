import * as uuid from 'uuid';

export default class UUID {
    static genUUID(): string {
        return uuid.v4();
    }
}
