import * as redis from './redis.util'
let acl = require('acl');
const auth = new acl(new acl.redisBackend(redis));
export default auth;