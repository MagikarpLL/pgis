import * as jwt from 'jsonwebtoken';
import config from '../config';
import redis from './redis.util';
import * as moment from 'moment';

interface Token {
    username: string;
}

export default class JWT {
    static sign(payload: Token, time?: number): string {
        const token = jwt.sign(payload, config.jwt.secret, {
            expiresIn: time || config.jwt.time
        });
        redis.set(`JWT:${payload.username}`, token);
        return token;
    }

    static verify(token: string): boolean {
        try {
            jwt.verify(token, config.jwt.secret);
            return true;
        } catch (error) {
            return false;
        }
    }

    static decode(token: string): {username: string, iat: number, exp: number } {
        try {
            return jwt.decode(token);
        } catch (error) {
            return null;
        }
    }
};