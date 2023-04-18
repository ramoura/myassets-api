export default class Transaction {
    symbol: string;
    quantity: number;
    unitValue: number;
    date: Date;
    type: string;
    constructor(symbol: string, quantity: number, unitValue: number, date: Date, type: string) {
        this.symbol = symbol;
        this.quantity = quantity;
        this.unitValue = unitValue;
        this.date = date;
        this.type = type;
    }

}