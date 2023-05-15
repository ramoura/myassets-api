import ExpressAdapter from "./infra/ExpressAdapter";
import CSVTransactionsImportController from "./infra/http/CSVTransactionsImportController";
import CsvTransactionReader from "./infra/CsvTransactionReader";
import ImportAssetTransactions from "./application/ImportAssetTransactions";
import InMemory from "./infra/repository/InMemory";
import GetCurrentPortfolioController from "./infra/http/GetCurrentPortfolioController";
import GetCurrentPortfolio from "./application/GetCurrentPortfolio";
import QuoteGateway from "./application/gateway/QuoteGateway";
import QuoteGatewayFinanceYahoo from "./infra/gateway/QuoteGatewayFinanceYahoo";
import CurrencyGatewayAdapterYahoo from "./infra/gateway/CurrencyGatewayAdapterYahoo";
import PortfolioDatabaseRepository from "./infra/repository/PortfolioDatabaseRepository";


const httpServer = new ExpressAdapter()

const quoteGateway: QuoteGateway = new QuoteGatewayFinanceYahoo('https://query1.finance.yahoo.com/v10/finance/quoteSummary/')
const csvTransactionReader = new CsvTransactionReader()
let repository = new PortfolioDatabaseRepository();

const importAssetTransactions = new ImportAssetTransactions(csvTransactionReader, repository);
let getCurrentPortfolio = new GetCurrentPortfolio(repository, quoteGateway, new CurrencyGatewayAdapterYahoo('https://query1.finance.yahoo.com/v10/finance/quoteSummary/'))

new GetCurrentPortfolioController(httpServer, getCurrentPortfolio)
new CSVTransactionsImportController(httpServer, importAssetTransactions)

httpServer.listen(3000)




