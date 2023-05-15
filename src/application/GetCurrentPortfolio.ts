import PortfolioRepository from "./repository/PortfolioRepository";
import QuoteGateway from "./gateway/QuoteGateway";
import Portfolio from "../domain/entity/Portfolio";
import Quote from "../domain/entity/Quote";
import {Asset} from "../domain/entity/Asset";
import CurrentPortfolio from "../domain/entity/CurrentPortfolio";
import CurrencyGateway from "./gateway/CurrencyGateway";

export interface AssetOutput {
    symbol: string;
    quantity: number;
    averagePrice: number;
    price: number;
    total: number;
    dailyVariation: {
        change: number;
        changePercent: string;
    }
}

interface  PortfolioOutput {
    assets: AssetOutput[];
    total: number;
    dailyVariation: {
        change: number;
        changePercent: string;
    }
}

export default class GetCurrentPortfolio {
    constructor(readonly portfolioRepository: PortfolioRepository, readonly quoteGateway: QuoteGateway, readonly currencyGateway: CurrencyGateway) {
    }

    async execute(user: string): Promise<PortfolioOutput> {
        const currency = await this.currencyGateway.getCurrency();

        const portfolio= await this.portfolioRepository.getPortfolio(user);
        if (!portfolio) {
            throw new Error("Portfolio not found");
        }

        const quotes: Quote[] = await this.quoteGateway.getQuotes(portfolio.getAssets().map((asset: Asset) => {
            return {
                code: asset.symbol,
                exchange: asset.exchange
            }
        }));

        const portfolioMarketValue = CurrentPortfolio.createCurrentPortfolio(portfolio, quotes);
        let currentAssets = portfolioMarketValue.getAssets();

        const assets: AssetOutput[] = currentAssets.map((currentAsset) => {
            return {
                symbol: currentAsset.asset.symbol,
                quantity: currentAsset.asset.getQuantity(),
                averagePrice: currentAsset.asset.getAvgPrice(),
                price: currentAsset.getPrice(),
                total: currentAsset.getCurretTotal(currency),
                dailyVariation: {
                    change: currentAsset.getDailyVariation().change,
                    changePercent: (currentAsset.getDailyVariation().changePercent * 100).toFixed(2)
                }
            }
        });

        let totalChangeVariation = currentAssets.reduce((total, currentAsset) => total + currentAsset.getDailyVariation().change, 0);
        let totalChange = portfolioMarketValue.getTotal(currency);
        return {
            assets: assets,
            total: totalChange,
            dailyVariation: {
                change: totalChangeVariation,
                changePercent: (totalChangeVariation / totalChange * 100).toFixed(2)
            }
        }

    }
}
