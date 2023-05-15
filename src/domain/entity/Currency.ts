interface CurrencyValue {
    code: string;
    value: number;
}

export default class Currency {

    constructor(readonly currencyValue: CurrencyValue[]) {
    }

    convertValue(currencyCode:string, value: number): number {
        const currency = this.currencyValue.find(currency => currency.code === currencyCode);

        if(!currency) {
            return value;
        }

        return value * currency.value;
    }

}