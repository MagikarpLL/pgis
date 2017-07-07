import auth from "../../utils/auth.util"

export async function getUserRoles(id: string) {
    return auth.userRoles(id);
}

export function getRoleUsers(roleName: string) {
    return auth.roleUsers(roleName);
}

export function hasRole(id: string, roleName: string) {
    return auth.hasRole(id, roleName);
}

export function removeRole(roleName: string) {
    auth.removeRole(roleName);
}

export function removeResource(resource: string) {
    auth.removeResource(resource);
}

export function allow(roles: any, resources: any, permissions: any) {
    auth.allow(roles, resources, permissions);
}

export function removeAllow(role: any, resources: any, permissions: any) {
    auth.removeAllow(role, resources, permissions);
}

export function allowedPermissions(id: string, resources: any) {
    return auth.allowedPermissions(id, resources);
}