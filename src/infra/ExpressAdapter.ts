import HttpServer from "./http/HttpServer";
import express, {RequestHandler} from "express";

export default class ExpressAdapter implements HttpServer {
    app: any
    constructor() {
        this.app = express()
    }

    registerUpload(path: string, handler: RequestHandler, func: Function): void {
        this.app.post(path, handler, async function(req: any, res: any) {
            const result = await func(req.params, req.file)
            res.send(result)
        });
    }

    register(method: string, path: string, handler: Function): void {

        this.app[method](path, async function(req: any, res: any) {
            const result = await handler(req.params, req.body)
            res.send(result)
        })
    }

    listen(port: number): void {
        this.app.listen(port, () => {
            console.log(`Example app listening at http://localhost:${port}`)
        })
    }
}