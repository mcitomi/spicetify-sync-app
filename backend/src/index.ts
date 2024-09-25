console.log("Hello via Bun!");
import { port } from "../config.json";
import { RequestHandler } from "./requests/reqhandler";

const requesthandler : RequestHandler = new RequestHandler();

requesthandler.register(); 

Bun.serve({
    // development: true,
    port : port,
    async fetch(r : Request) {
        return await requesthandler.listener(r);
    },
});