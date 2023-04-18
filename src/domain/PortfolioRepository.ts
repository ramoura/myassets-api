import Portfolio from "./model/Portfolio";

export default interface PortfolioRepository {
    getPortfolio(user: string): Promise<Portfolio>;
    savePortfolio(portfolio: Portfolio): void;
}