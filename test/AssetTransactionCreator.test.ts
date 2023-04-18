import Portfolio from "../src/domain/model/Portfolio";
import CsvTransactionReader from "../src/infra/CsvTransactionReader";
const fs = require('fs');


test("should add a purchase transaction ", async () => {
    const filePath = "/home/renato/Downloads/carteira-export.csv"
    const csvData = fs.readFileSync(filePath, 'utf8').toString();
    let assetTransactionCreator = new CsvTransactionReader();
    let transactions = await assetTransactionCreator.readTransactions(csvData)

    let portfolio = new Portfolio();
    for(let  i = 0; i < transactions.length; i++){
        portfolio.addTransaction(transactions[i]);
    }





});

