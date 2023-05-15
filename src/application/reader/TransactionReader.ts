import Transaction from "../../domain/entity/Transaction";

export default interface TransactionReader {
    readTransactions(csvData: string): Promise<Transaction[]>
}