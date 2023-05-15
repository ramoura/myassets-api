import {Asset} from "./Asset";
import Quote from "./Quote";
import Currency from "./Currency";

export default class CurrentAsset {

    constructor(readonly asset: Asset, readonly currentQuote: Quote) {
    }
    getPrice() {
        return this.currentQuote.price;
    }

    getCurretTotal(currency: Currency) {
        return this.asset.getQuantity() * this.convertTo(currency)
    }

    getDailyVariation() {
        return {
            change: this.asset.getQuantity() * this.currentQuote.dailyVariation.change,
            changePercent: this.currentQuote.dailyVariation.changePercent
        }
    }

    private convertTo(currency: Currency) : number{
        return currency.convertValue(this.asset.currency, this.currentQuote.price);
    }

}