import CurrencyGateway from "../../application/gateway/CurrencyGateway";
import Currency from "../../domain/entity/Currency";
import aixos from "axios/index";
import {QuoteFactory} from "../../domain/entity/Quote";

export default class CurrencyGatewayAdapterYahoo implements CurrencyGateway {
    private readonly baseUrl: string

    constructor(baseUrl: string) {
        this.baseUrl = baseUrl
    }


    async getCurrency(): Promise<Currency> {
        return new Currency([
            {code: "USD", value: 4.95},
            {code: "BRL", value: 1}
        ])
        // const results = await Promise.all(
        //     inputQuotes.map(async (inputQuote) => {
        //         const url = `${this.baseUrl}${currencyCode}?modules=price`
        //         try {
        //             const response = await aixos.get(url);
        //             const price = response.data.quoteSummary.result[0].price.regularMarketPrice.raw
        //             const regularMarketChange = response.data.quoteSummary.result[0].price.regularMarketChange.raw
        //             const regularMarketChangePercent = response.data.quoteSummary.result[0].price.regularMarketChangePercent.raw
        //
        //             return QuoteFactory.create(inputQuote.code, price, regularMarketChange, regularMarketChangePercent);
        //         } catch (e) {
        //             //console.log(e)
        //         }
        //         return QuoteFactory.createEmpty(inputQuote.code);
        //     }));
        // return results;
    }

}