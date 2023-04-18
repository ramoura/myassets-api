import HttpServer from "./HttpServer";
import GetCurrentPortfolio from "../../application/GetCurrentPortfolio";

export default class GetCurrentPortfolioController {

    constructor(readonly httpServer: HttpServer, getCurrentPortfolio: GetCurrentPortfolio) {
        httpServer.register("get",  "/portfolio/current", async function(params: any, body: any) {
            return await getCurrentPortfolio.execute("eu")
        })
    }
}