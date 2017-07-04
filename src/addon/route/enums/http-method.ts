enum HttpMethod {
    HEAD,
    OPTIONS,
    GET,
    PUT,
    PATCH,
    POST,
    DELETE
}

namespace HttpMethod {
    export function toString(method: HttpMethod): string {
        switch (method) {
            case HttpMethod.GET:
                return 'get';
            case HttpMethod.POST:
                return 'post';
            case HttpMethod.PUT:
                return 'put';
            case HttpMethod.DELETE:
                return 'delete';
            case HttpMethod.OPTIONS:
                return 'options';
            case HttpMethod.HEAD:
                return 'head';
            case HttpMethod.PATCH:
                return 'patch';
        }
    }
}
export default HttpMethod;