import csv from "csv-parser";
import {Readable} from 'stream'
import Transaction from "../domain/entity/Transaction";
import moment = require("moment");
import TransactionReader from "../application/reader/TransactionReader";

interface CsvTransaction {
    date: string;
    type: string;
    maerketType: string;
    prazo: string;
    exchange: string;
    ticker: string;
    quantity: string;
    unitValue: string;
}

export default class CsvTransactionReader implements TransactionReader {

    readTransactions(csvData: string): Promise<Transaction[]> {
        return new Promise((resolve, reject) => {
            const results: Transaction[] = [];
            const stream = Readable.from(csvData).pipe(csv())

            stream.on("data", (data: CsvTransaction) => {
                results.push(this.convertToTransaction(data));
            });

            stream.on("end", () => {
                results.sort((a: Transaction, b: Transaction) => a.date.getTime() - b.date.getTime());
                resolve(results);
            });

            stream.on("error", (err) => {
                console.log(err)
                reject(err);
            });
        });
    };

    private convertToTransaction(data: any): Transaction {
        return new Transaction(
            data["Código Ativo"],
            Number(data["Quantidade"].replace(",", ".")),
            Number(data["Preço unitário"].replace("R$", "").replace(".", "").replace(",", ".")),
            moment(data["Data operação"], "DD/MM/YYYY").toDate(),
            this.convertType(data["Operação C/V"]),
            data["Exchange"],
            data["Currency"]
        );
    }

    private convertType(type: string) {
        if (type === "C") {
            return "BUY";
        }
        if (type === "V") {
            return "SELL";
        }
        return "";
    }

}