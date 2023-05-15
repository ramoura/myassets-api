import GetCurrentPortfolio from "../../src/application/GetCurrentPortfolio";
import PortfolioRepository from "../../src/application/repository/PortfolioRepository";
import Portfolio from "../../src/domain/entity/Portfolio";
import Transaction from "../../src/domain/entity/Transaction";
import QuoteGateway, {InputQuote} from "../../src/application/gateway/QuoteGateway";
import CurrencyGateway from "../../src/application/gateway/CurrencyGateway";
import Currency from "../../src/domain/entity/Currency";


describe("GetCurrentPortfolio", () => {
    it("should return current values from portfolio ", async () => {
        const portfolioRepository: PortfolioRepository = {
            savePortfolio: async (portfolio: Portfolio) => {return portfolio},
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
            getQuotes: async (symbols: InputQuote[]) => {
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


        const currencyGateway: CurrencyGateway = {
            getCurrency: async () => {
                return new Currency([]);
            }
        }

        let getPortfolio = new GetCurrentPortfolio(portfolioRepository, quoteGateway, currencyGateway);
        let portfolioOutput = await getPortfolio.execute("user");

        let assetOutPetr4 = portfolioOutput.assets.find(value => value.symbol === "PETR4");
        let assetOutVale5 = portfolioOutput.assets.find(value => value.symbol === "VALE5");

        expect(assetOutPetr4?.quantity).toEqual(20);
        expect(assetOutPetr4?.total).toEqual(204.60000000000002);

        expect(assetOutVale5?.quantity).toEqual(7);
        expect(assetOutVale5?.total).toEqual(617.54);

        expect(portfolioOutput.total).toEqual(822.14)

    });
    it("should return current values from portfolio with currency conversion", async () => {
        const portfolioRepository: PortfolioRepository = {
            savePortfolio: async (portfolio: Portfolio) => {return portfolio},
            getPortfolio: async (user: string) => {
                let portfolio = new Portfolio();
                const transaction1 = new Transaction("PETR4", 10, 1, new Date(), "BUY");
                const transaction2 = new Transaction("VOO", 10, 1, new Date(), "BUY", "NASD", "USD");

                portfolio.addTransaction(transaction1)
                portfolio.addTransaction(transaction2)

                return portfolio;
            }
        };

        const quoteGateway: QuoteGateway = {
            getQuotes: async (symbols: InputQuote[]) => {
                return []
            }
        }
        const currencyGateway: CurrencyGateway = {
            getCurrency: async () => {
                return new Currency([
                    {code: "USD", value: 4.95},
                    {code: "BRL", value: 1}
                ])
            }
        }

        let getPortfolio = new GetCurrentPortfolio(portfolioRepository, quoteGateway, currencyGateway);
        let portfolioOutput = await getPortfolio.execute("user");

        expect(portfolioOutput.total).toEqual(49.5+10)

    });
});