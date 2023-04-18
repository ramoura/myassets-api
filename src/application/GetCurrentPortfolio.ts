import PortfolioRepository from "../domain/PortfolioRepository";
import QuoteGateway from "../domain/QuoteGateway";
import Portfolio from "../domain/model/Portfolio";
import Quote from "../domain/model/Quote";
import {Asset} from "../domain/model/Asset";
import CurrentPortfolio from "../domain/model/CurrentPortfolio";

interface AssetOutput {
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

interface PortfolioOutput {
    assets: AssetOutput[];
    total: number;
    dailyVariation: {
        change: number;
        changePercent: string;
    }
}

export default class GetCurrentPortfolio {
    constructor(readonly portfolioRepository: PortfolioRepository, readonly quoteGateway: QuoteGateway) {
    }

    async execute(user: string): Promise<PortfolioOutput> {
        let portfolio: Portfolio = await this.portfolioRepository.getPortfolio(user);
        const quotes: Quote[] = await this.quoteGateway.getQuotes(portfolio.getAssets().map((asset: Asset) => asset.symbol));

        const portfolioMarketValue = CurrentPortfolio.createCurrentPortfolio(portfolio, quotes);
        let currentAssets = portfolioMarketValue.getAssets();

        const assets: AssetOutput[] = currentAssets.map((currentAsset) => {
            return {
                symbol: currentAsset.asset.symbol,
                quantity: currentAsset.asset.getQuantity(),
                averagePrice: currentAsset.asset.getAvgPrice(),
                price: currentAsset.getPrice(),
                total: currentAsset.getCurretTotal(),
                dailyVariation: {
                    change: currentAsset.getDailyVariation().change,
                    changePercent: (currentAsset.getDailyVariation().changePercent * 100).toFixed(2)
                }
            }
        });

        let totalChangeVariation = currentAssets.reduce((total, currentAsset) => total + currentAsset.getDailyVariation().change, 0);
        return {
            assets: assets,
            total: portfolioMarketValue.getTotal(),
            dailyVariation: {
                change: totalChangeVariation,
                changePercent: (totalChangeVariation / portfolioMarketValue.getTotal() * 100).toFixed(2)
            }
        }

    }
}
