import HttpServer from "./HttpServer";
import multer from "multer";
import fs from "fs";
import ImportAssetTransactions from "../../application/ImportAssetTransactions";

const upload = multer({
    dest: "uploads/",
    // Outras opções...
});
export default class CSVTransactionsImportController {

    constructor(readonly httpServer: HttpServer, importAssetTransactions: ImportAssetTransactions) {
        httpServer.registerUpload("/import/csv", upload.single("csvFile"), async function(params: any, body: any) {
            const csvData = fs.readFileSync(body.path, 'utf8').toString();
            await importAssetTransactions.execute(csvData)

            return null
        })
    }
}