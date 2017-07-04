export default {
    connect: {
        host: '127.0.0.1',
        port: 6379,
        family: 4,           // 4 (IPv4) or 6 (IPv6)
        password: '',
        db: 0
    },
    namespace: {
        dataform: 'data-form',
        bizform: 'biz-form',
        datasource: 'datasource',
        dictionary: 'dictionary',
    }
}