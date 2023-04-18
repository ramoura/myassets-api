import PortfolioRepository from "../../domain/PortfolioRepository";
import Portfolio from "../../domain/model/Portfolio";

export default class InMemory implements PortfolioRepository {
    private portfolio: Portfolio;

    constructor() {
        this.portfolio = new Portfolio();
    }

    async getPortfolio(user: string): Promise<Portfolio> {
        return this.portfolio;
    }

    savePortfolio(portfolio: Portfolio): void {
        this.portfolio = portfolio;
    }
}