export default class Transaction {
    symbol: string;
    quantity: number;
    unitValue: number;
    date: Date;
    type: string;
    exchange: string;
    constructor(symbol: string, quantity: number, unitValue: number, date: Date, type: string, exchange: string = 'B3', readonly currency: string = 'BRL') {
        this.symbol = symbol;
        this.quantity = quantity;
        this.unitValue = unitValue;
        this.date = date;
        this.type = type;
        this.exchange = exchange;
    }

}