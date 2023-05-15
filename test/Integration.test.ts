import Portfolio from "../src/domain/entity/Portfolio";
import CsvTransactionReader from "../src/infra/CsvTransactionReader";
import PortfolioRepository from "../src/application/repository/PortfolioRepository";
import QuoteGateway from "../src/application/gateway/QuoteGateway";
import GetCurrentPortfolio, {AssetOutput} from "../src/application/GetCurrentPortfolio";
import QuoteGatewayFinanceYahoo from "../src/infra/gateway/QuoteGatewayFinanceYahoo";
import CurrencyGateway from "../src/application/gateway/CurrencyGateway";
import Currency from "../src/domain/entity/Currency";
const fs = require('fs');

test("should add a purchase transaction ", async () => {

    const portfolioRepository: PortfolioRepository = {
        savePortfolio: async (portfolio: Portfolio) => {return portfolio},
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

    jest.fn()
    let currencyGateway: CurrencyGateway = {
        getCurrency: async () => {
            return new Currency([
                {code: "USD", value: 4.95},
                {code: "BRL", value: 1}
            ])
        }
    }


    const quoteGateway: QuoteGateway = new QuoteGatewayFinanceYahoo('https://query1.finance.yahoo.com/v10/finance/quoteSummary/')
    let getPortfolio = new GetCurrentPortfolio(portfolioRepository, quoteGateway, currencyGateway);
    let portfolioOutput = await getPortfolio.execute("user");
    portfolioOutput.assets.sort((a: AssetOutput, b: AssetOutput) => a.dailyVariation.change - b.dailyVariation.change);
    console.log(JSON.stringify(portfolioOutput, null, 2));

});

