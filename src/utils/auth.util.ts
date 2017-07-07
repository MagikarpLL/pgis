import * as redis from './redis.util'
let acl = require('acl');
const auth = new acl(new acl.redisBackend(redis));
auth.allow('guest', 'data', 'view');
auth.allow('modifier', 'data', ['view', 'edit', 'delete']);
auth.allow('admin', '*', '*');
export default auth;

export async function getUserRoles(id: string) {
    return auth.userRoles(id);
}

export async function getRoleUsers(roleName: string) {
    return auth.roleUsers(roleName);
}

export async function hasRole(id: string, roleName: string) {
    return auth.hasRole(id, roleName);
}

export async function removeRole(roleName: string) {
    auth.removeRole(roleName);
}

export async function removeResource(resource: string) {
    auth.removeResource(resource);
}

export async function allow(roles: any, resources: any, permissions: any) {
    auth.allow(roles, resources, permissions);
}

export async function removeAllow(role: any, resources: any, permissions: any) {
    auth.removeAllow(role, resources, permissions);
}

export async function allowedPermissions(id: string, resources: any) {
    return auth.allowedPermissions(id, resources);
}


