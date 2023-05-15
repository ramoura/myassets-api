export default interface Quote {
    symbol: string;
    price: number;
    dailyVariation: {
        change: number;
        changePercent: number;
    };
}

export class QuoteFactory {
    static create(symbol: string, price: number, change: number, changePercent: number): Quote {
        return {
            symbol,
            price,
            dailyVariation:{
                change,
                changePercent
            },
        };
    }

    static createEmpty(symbol: string): Quote {
        return {
            symbol,
            price: 1,
            dailyVariation:{
                change: 0,
                changePercent: 0
            }
        };
    }

}
