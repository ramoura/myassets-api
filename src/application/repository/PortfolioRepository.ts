import Portfolio from "../../domain/entity/Portfolio";

export default interface PortfolioRepository {
    getPortfolio(user: string): Promise<Portfolio | undefined>;
    savePortfolio(portfolio: Portfolio): Promise<Portfolio>;
}