import Quote from "../../domain/entity/Quote";


export interface InputQuote {
    code: string;
    exchange: string;
}

export default interface QuoteGateway {
    getQuotes(inputQuote: InputQuote[]): Promise<Quote[]>;
}