import QuoteGateway from "../domain/QuoteGateway";
import Quote, {QuoteFactory} from "../domain/model/Quote";
import aixos from "axios";

export default class QuoteGatewayFinanceYahoo implements QuoteGateway {
    private readonly baseUrl: string

    constructor(baseUrl: string) {
        this.baseUrl = baseUrl
    }

    async getQuotes(symbols: string[]): Promise<Quote[]> {

        const results = await Promise.all(
            symbols.map(async (symbol) => {
                const suffix = this.getSufix(symbol)
                const url = `${this.baseUrl}${symbol}${suffix}?modules=price`
                try {
                    const response = await aixos.get(url);
                    const price = response.data.quoteSummary.result[0].price.regularMarketPrice.raw
                    const regularMarketChange = response.data.quoteSummary.result[0].price.regularMarketChange.raw
                    const regularMarketChangePercent = response.data.quoteSummary.result[0].price.regularMarketChangePercent.raw

                    const convertedPrice = this.convertIfDollar(symbol, price)

                    return QuoteFactory.create(symbol, convertedPrice, regularMarketChange, regularMarketChangePercent);
                } catch (e) {
                    //console.log(e)
                }
                return QuoteFactory.createEmpty(symbol);
            }));
        return results;

    }

    private convertIfDollar(symbol: string, price: number) : number{
        if (symbol.startsWith('VOO') || symbol.startsWith('ACWI') || symbol.startsWith('IEFA') || symbol.startsWith('INTR')) {
            return price * 4.95
        }
        return price;

    }

    private getSufix(symbol: string) {
        if (symbol.startsWith('VOO') || symbol.startsWith('ACWI') || symbol.startsWith('IEFA') || symbol.startsWith('INTR')) {
            return ''
        }
        return '.SA';
    }
}