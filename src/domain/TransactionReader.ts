import Transaction from "./model/Transaction";

export default interface TransactionReader {
    readTransactions(csvData: string): Promise<Transaction[]>
}