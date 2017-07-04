import * as mongoose from 'mongoose';

const url = 'mongodb://127.0.0.1:27017/test';

const mongo = mongoose.createConnection(url);

mongo.on('connect', () => console.log(`mongoDB连接成功 ${url}`));

export default mongo;