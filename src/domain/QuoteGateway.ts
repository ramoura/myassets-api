import Quote from "./model/Quote";

export default interface QuoteGateway {
    getQuotes(symbols: string[]): Promise<Quote[]>;
}