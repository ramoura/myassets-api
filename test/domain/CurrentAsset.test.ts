import CurrentAsset from "../../src/domain/entity/CurrentAsset";
import {Asset} from "../../src/domain/entity/Asset";
import {QuoteFactory} from "../../src/domain/entity/Quote";
import Currency from "../../src/domain/entity/Currency";

class DollarCurrency extends Currency{

}
class RealCurrency extends Currency {

}

describe("CurrentAsset", () => {
    describe("constructor", () => {
        it("should create a CurrentAsset", () => {
            const asset = Asset.of("PETR4", "B3", "BRL", 100, 10);
            const quote = QuoteFactory.createEmpty("PETR4")

            const currentAsset = new CurrentAsset(asset, quote);

            expect(currentAsset.getCurretTotal(new Currency([]))).toBe(100);

        });

        it("should converter CurrentAsset to local currency", () => {
            const asset = Asset.of("PETR4", "B3", "USD", 100, 10);
            const quote = QuoteFactory.createEmpty("PETR4")

            const dollar = new DollarCurrency([
                {code: "USD", value: 4.95},
                {code: "BRL", value: 1}
            ]);

            const currentAsset = new CurrentAsset(asset, quote);

            expect(currentAsset.getCurretTotal(dollar)).toBe(100 * 4.95);

        });
    });

});