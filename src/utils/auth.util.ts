import * as redis from './redis.util'
let acl = require('acl');
const auth = new acl(new acl.redisBackend(redis));
auth.allow('guest', 'data', 'view');
auth.allow('modifier', 'data', ['view', 'edit', 'delete']);
auth.allow('admin', '*', '*');
export default auth;




