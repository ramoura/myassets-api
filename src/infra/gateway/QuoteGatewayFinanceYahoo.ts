import QuoteGateway, {InputQuote} from "../../application/gateway/QuoteGateway";
import Quote, {QuoteFactory} from "../../domain/entity/Quote";
import aixos from "axios";

export default class QuoteGatewayFinanceYahoo implements QuoteGateway {
    private readonly baseUrl: string

    constructor(baseUrl: string) {
        this.baseUrl = baseUrl
    }

    async getQuotes(inputQuotes: InputQuote[]): Promise<Quote[]> {

        const results = await Promise.all(
            inputQuotes.map(async (inputQuote) => {
                const suffix = this.getSufix(inputQuote)
                const url = `${this.baseUrl}${inputQuote.code}${suffix}?modules=price`
                try {
                    const response = await aixos.get(url);
                    const price = response.data.quoteSummary.result[0].price.regularMarketPrice.raw
                    const regularMarketChange = response.data.quoteSummary.result[0].price.regularMarketChange.raw
                    const regularMarketChangePercent = response.data.quoteSummary.result[0].price.regularMarketChangePercent.raw

                    return QuoteFactory.create(inputQuote.code, price, regularMarketChange, regularMarketChangePercent);
                } catch (e) {
                    //console.log(e)
                }
                return QuoteFactory.createEmpty(inputQuote.code);
            }));
        return results;

    }
    
    private getSufix(inputQuote: InputQuote): string {
        if (inputQuote.exchange === 'B3') {
            return '.SA'
        }
        return '';
    }
}