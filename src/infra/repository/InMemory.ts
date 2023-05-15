import PortfolioRepository from "../../application/repository/PortfolioRepository";
import Portfolio from "../../domain/entity/Portfolio";

export default class InMemory implements PortfolioRepository {
    private portfolio: Portfolio;

    constructor() {
        this.portfolio = new Portfolio();
    }

    async getPortfolio(user: string): Promise<Portfolio | undefined> {
        return this.portfolio;
    }

    async savePortfolio(portfolio: Portfolio): Promise<Portfolio> {
        this.portfolio = portfolio;
        return this.portfolio;
    }
}