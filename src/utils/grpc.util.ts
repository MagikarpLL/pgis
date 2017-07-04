var grpc = require('grpc');
import config from '../config';

export class Grpc {

    package: any;
    client: any;

    constructor(protoPath: string, packageName: string) {
        this.package = grpc.load(`${__dirname}/../proto/${protoPath}`)[packageName];
    }

    init(clientName: string) {
        this.client = new this.package[clientName](config.grpc.server, grpc.credentials.createInsecure());
    }

    call(method: string, request: any) {
        return new Promise((resolve, reject) => {
            var c = this.client[method](request, (err: any, data: any) => {
                if (err) reject(err);
                resolve(data);
            });
            c.on('end', function (e: any) {
                console.log('grpc server end');
            });
        });
    }

    destroy(){
        // this.client.destroy()
    }
}