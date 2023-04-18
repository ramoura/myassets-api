import Portfolio from "./Portfolio";
import Quote, {QuoteFactory} from "./Quote";
import CurrentAsset from "./CurrentAsset";

export default class CurrentPortfolio {

    constructor(readonly portfolio: Portfolio, readonly quotes: Quote[]) {
    }

    static createCurrentPortfolio(portfolio: Portfolio, quotes: Quote[]): CurrentPortfolio {
        return new CurrentPortfolio(portfolio, quotes);
    }

    getAssets(): CurrentAsset[] {
        return this.portfolio.getAssets().map(asset => {
            const quote:Quote = this.quotes.find(quote => quote.symbol === asset.symbol) || QuoteFactory.createEmpty(asset.symbol);
            return new CurrentAsset(asset, quote );
        });
    }

    getTotal() {
        return this.getAssets().reduce((total, currentAsset) => total + currentAsset.getCurretTotal(), 0);
    }
}