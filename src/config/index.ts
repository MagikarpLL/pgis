import * as nconf from 'nconf';
import * as path from 'path';

export default {
    host: '0.0.0.0',
    port: 3000,
    root: path.join(__dirname, '../'),
    showsql: true,
    jwt: {
        secret: 'shared-secret',
        indexfield: 'user',
        time: 60 * 30,      // 30mins
        unless: [
            /^\/public/,
            /^\/index/
        ]
    },
    grpc: {
        server: '127.0.0.1:6565'
    },
    log: {
        log_name: "log",
        log_path: "logs/"
    },
    ftproot:'../public',
    secret:'vuCJMpjHQEmOPb4V'
};