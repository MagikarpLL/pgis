import * as moment from 'moment';
export default class DATE {

    static getDateTime(date?: string): string {
        return moment(date).format("YYYY-MM-DD HH:mm:ss");
    }

    static getDate(date?: string): string {
        return moment(date).format("YYYY-MM-DD");
    }

    static getTimestamp(date?: string): number {
        return moment(date).valueOf();
    }

}