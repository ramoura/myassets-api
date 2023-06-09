import {Asset} from "./Asset";
import Transaction from "./Transaction";

export default class Portfolio {

    private readonly assets: Asset[]

    private user: string

    constructor(assets: Asset[] = [], user: string = "newUser") {
        this.assets = assets;
        this.user = user;
    }


    getAsset(symbol: string): Asset | undefined {
        return this.assets.find(asset => asset.symbol === symbol);
    }

    removeAsset(symbol: string) {
        this.assets.splice(this.assets.findIndex(asset => asset.symbol === symbol), 1)
    }

    addTransaction(transaction: Transaction) {
        let asset = this.getAsset(transaction.symbol);
        if (asset) {
        } else {
            asset = Asset.of(transaction.symbol, transaction.exchange, transaction.currency);
            this.addAsset(asset);
        }
        asset.addTransaction(transaction);
        this.verifyAndRemove(asset);
    }
    private addAsset(asset: Asset): void {
        this.assets.push(asset);
    }

    private verifyAndRemove(asset: Asset) {
        if (asset.getQuantity() <= 0.0000000) {
            //console.log("removing asset: " + asset.symbol)
            this.removeAsset(asset.symbol);
        }
    }

    getAssets() {
        return this.assets;
    }
}