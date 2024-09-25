import fs from "node:fs";

type Endpoint = {
    route: string;
    name: string;
    type: string;
}

export class RequestHandler {
    private endpoints: Endpoint[] = [];

    public async listener(req: Request) {
        const request_url = (new URL(req.url).pathname).toLowerCase();

        const api_prefix = "/api";

        const endpoint = this.endpoints.find(endpoint => endpoint.name.toLowerCase() === (request_url.slice(api_prefix.length).endsWith("/") ? request_url.slice(api_prefix.length).slice(0, -1) : request_url.slice(api_prefix.length)) && endpoint.type.toUpperCase() === req.method.toUpperCase());
        
        if (endpoint) {
            const file = require(`${endpoint?.route}`);
            return await file.handleRequest(req);
        } else {
            return new Response(`{"message":"invalid endpoint or wrong method used"}`, { status: 404 });
        }
    }
    
    public register() {
        fs.readdirSync(import.meta.dir).map((method: string) => {
            if (!method.endsWith('.ts')) {
                fs.readdirSync(import.meta.dir + `/${method}/`).map((fileName: string) => {
                    scanSubFolders(fileName, import.meta.dir + `/${method}/`, method, this.endpoints);
                });
            }
        });

        function scanSubFolders(item: string, path: string, method: string, endpoints: Endpoint[]) {
            fs.stat(path + item, (err, stats) => {
                if (err) {
                    console.error(`Endpoint register error: ${err}`);
                } else {
                    if (stats.isDirectory()) {
                        fs.readdirSync(path + item).map((file: string) => {
                            scanSubFolders(file, path + item + "/", method, endpoints);
                        });
                    } else if (stats.isFile()) {
                        const route = path + item;
                        const name = route.slice(route.indexOf(method) + method.length).split('.')[0];
                        const type = method;
                        console.info(`📜 ${method}\t${name} loaded!`);
                        endpoints.push({ route, name, type });
                    }
                }
            });
        }
    }
}