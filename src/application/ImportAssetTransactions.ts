import Transaction from "../domain/entity/Transaction";
import TransactionReader from "./reader/TransactionReader";
import PortfolioRepository from "./repository/PortfolioRepository";
import Portfolio from "../domain/entity/Portfolio";

export default class ImportAssetTransactions {

    constructor(private readonly transactionReader: TransactionReader, readonly portfolioRepository: PortfolioRepository) {

    }

    async execute(user: string, csvData: string): Promise<void> {
        const transactions: Transaction[] = await this.transactionReader.readTransactions(csvData);
        let portfolio = await this.portfolioRepository.getPortfolio(user);
        if (!portfolio) {
            portfolio = new Portfolio([], user);
        }
        transactions.forEach((transaction) => {
            portfolio?.addTransaction(transaction);
        });

        await this.portfolioRepository.savePortfolio(portfolio);


    }
}