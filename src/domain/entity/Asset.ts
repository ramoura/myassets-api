import Transaction from "./Transaction";

export class Asset {
    private quantity: number = 0
    private avgPrice: number = 0

    private constructor(readonly symbol: string, readonly currency: string, readonly exchange: string, quantity: number = 0, avgPrice: number = 0) {
        this.quantity = quantity;
        this.avgPrice = avgPrice;
    }

    static of(symbol: string, exchange: string = "B3", currency:string="BRL",quantity: number = 0, avgPrice: number = 0): Asset {
        return new Asset(symbol, currency, exchange, quantity, avgPrice);
    }

    addTransaction(transaction: Transaction) {
        if (transaction.type === "BUY") {
            this.avgPrice = (this.avgPrice * this.quantity + transaction.unitValue * transaction.quantity) / (this.quantity + transaction.quantity)
            this.quantity = this.getNumber(this.quantity) + this.getNumber(transaction.quantity);
        } else {
            this.quantity = this.getNumber(this.quantity) - this.getNumber(transaction.quantity)
        }

    }

    private getNumber(quantity: number) {
        return parseFloat(quantity.toPrecision(12));
    }

    getQuantity() {
        return this.quantity;
    }

    getAvgPrice() {
        return this.avgPrice;
    }

    getTotalInvested() {
        if (!this.quantity || this.quantity <= 0) return 0;
        if (!this.avgPrice || this.avgPrice <= 0) return 0;
        return this.quantity * this.avgPrice;
    }
}