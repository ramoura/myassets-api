import GetCurrentPortfolio from "../src/application/GetCurrentPortfolio";
import PortfolioRepository from "../src/domain/PortfolioRepository";
import Portfolio from "../src/domain/model/Portfolio";
import Transaction from "../src/domain/model/Transaction";
import QuoteGateway from "../src/domain/QuoteGateway";
import {Asset} from "../src/domain/model/Asset";


test("should add a purchase transaction ", async () => {
        const portfolioRepository: PortfolioRepository = {
            savePortfolio: (portfolio: Portfolio) => {},
            getPortfolio: async (user: string) => {
                let portfolio = new Portfolio();
                const transaction1 = new Transaction("PETR4", 10, 7, new Date(), "BUY");
                const transaction2 = new Transaction("PETR4", 10, 21, new Date(), "BUY");
                const transaction3 = new Transaction("VALE5", 10, 100, new Date(), "BUY");
                const transaction4 = new Transaction("VALE5", 3, 80, new Date(), "SALE");

                portfolio.addTransaction(transaction1)
                portfolio.addTransaction(transaction2)
                portfolio.addTransaction(transaction3)
                portfolio.addTransaction(transaction4)

                return portfolio;
            }
        };

        const quoteGateway: QuoteGateway = {
            getQuotes: async (symbols: string[]) => {
                return [
                    {
                        "symbol": "PETR4",
                        "price": 10.23,
                        dailyVariation: {
                            "change": 1.0,
                            "changePercent": 0.5
                        }
                    },
                    {
                        "symbol": "VALE5",
                        "price": 88.22,
                        dailyVariation: {
                            "change": 1.0,
                            "changePercent": 0.5
                        }
                    }
                ]
            }
        }

        let getPortfolio = new GetCurrentPortfolio(portfolioRepository, quoteGateway);
        let portfolioOutput = await getPortfolio.execute("user");

        let assetOutPetr4 = portfolioOutput.assets.find(value  => value.symbol === "PETR4");
        let assetOutVale5 = portfolioOutput.assets.find(value  => value.symbol === "VALE5");

        expect(assetOutPetr4?.quantity).toEqual(20);
        expect(assetOutPetr4?.total).toEqual(204.60000000000002);

        expect(assetOutVale5?.quantity).toEqual(7);
        expect(assetOutVale5?.total).toEqual(617.54);

        expect(portfolioOutput.total).toEqual(822.14)

});
