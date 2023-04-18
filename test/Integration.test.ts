import Portfolio from "../src/domain/model/Portfolio";
import CsvTransactionReader from "../src/infra/CsvTransactionReader";
import PortfolioRepository from "../src/domain/PortfolioRepository";
import Transaction from "../src/domain/model/Transaction";
import QuoteGateway from "../src/domain/QuoteGateway";
import GetCurrentPortfolio from "../src/application/GetCurrentPortfolio";
import QuoteGatewayFinanceYahoo from "../src/infra/QuoteGatewayFinanceYahoo";
import {stringify} from "ts-jest";
const fs = require('fs');

test("should add a purchase transaction ", async () => {

    const portfolioRepository: PortfolioRepository = {
        savePortfolio: (portfolio: Portfolio) => {},
        getPortfolio: async (user: string) => {
            const filePath = "/home/renato/Downloads/carteira-export.csv"
            const csvData = fs.readFileSync(filePath, 'utf8').toString();
            let assetTransactionCreator = new CsvTransactionReader();
            let transactions = await assetTransactionCreator.readTransactions(csvData)

            let portfolio = new Portfolio();
            for (let i = 0; i < transactions.length; i++) {
                portfolio.addTransaction(transactions[i]);
            }
            return portfolio;
        }
    };

    const quoteGateway: QuoteGateway = new QuoteGatewayFinanceYahoo('https://query1.finance.yahoo.com/v10/finance/quoteSummary/')
    let getPortfolio = new GetCurrentPortfolio(portfolioRepository, quoteGateway);
    let portfolioOutput = await getPortfolio.execute("user");
    console.log(JSON.stringify(portfolioOutput, null, 2));








});

