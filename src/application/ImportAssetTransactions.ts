import Transaction from "../domain/model/Transaction";
import TransactionReader from "../domain/TransactionReader";
import PortfolioRepository from "../domain/PortfolioRepository";

export default class ImportAssetTransactions {

    constructor(private readonly transactionReader: TransactionReader, readonly portfolioRepository: PortfolioRepository) {

    }
    async execute(csvData: string): Promise<void> {
        const transactions: Transaction[] = await this.transactionReader.readTransactions(csvData);
        let portfolio = await this.portfolioRepository.getPortfolio('user1');
        transactions.forEach((transaction) => {
            portfolio.addTransaction(transaction);
        });

        await this.portfolioRepository.savePortfolio(portfolio);

        console.log(transactions)

    }
}