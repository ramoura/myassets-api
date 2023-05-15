import Currency from "../../domain/entity/Currency";

export default interface CurrencyGateway {
    getCurrency(): Promise<Currency>;
}