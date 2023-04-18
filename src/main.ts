import ExpressAdapter from "./infra/ExpressAdapter";
import CSVTransactionsImportController from "./infra/http/CSVTransactionsImportController";
import CsvTransactionReader from "./infra/CsvTransactionReader";
import ImportAssetTransactions from "./application/ImportAssetTransactions";
import InMemory from "./infra/repository/InMemory";
import GetCurrentPortfolioController from "./infra/http/GetCurrentPortfolioController";
import GetCurrentPortfolio from "./application/GetCurrentPortfolio";
import QuoteGateway from "./domain/QuoteGateway";
import QuoteGatewayFinanceYahoo from "./infra/QuoteGatewayFinanceYahoo";


const httpServer = new ExpressAdapter()

const quoteGateway: QuoteGateway = new QuoteGatewayFinanceYahoo('https://query1.finance.yahoo.com/v10/finance/quoteSummary/')
const csvTransactionReader = new CsvTransactionReader()
let inMemory = new InMemory();

const importAssetTransactions = new ImportAssetTransactions(csvTransactionReader, inMemory);
let getCurrentPortfolio = new GetCurrentPortfolio(inMemory, quoteGateway);

new GetCurrentPortfolioController(httpServer, getCurrentPortfolio)
new CSVTransactionsImportController(httpServer, importAssetTransactions)

httpServer.listen(3000)




