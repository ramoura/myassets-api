import {Asset} from "./Asset";
import Quote from "./Quote";

export default class CurrentAsset {

    constructor(readonly asset: Asset, readonly currentQuote: Quote) {
    }
    getPrice() {
        return this.currentQuote.price;
    }

    getCurretTotal() {
        return this.asset.getQuantity() * this.currentQuote.price
    }

    getDailyVariation() {
        return {
            change: this.asset.getQuantity() * this.currentQuote.dailyVariation.change,
            changePercent: this.currentQuote.dailyVariation.changePercent
        }
    }
}