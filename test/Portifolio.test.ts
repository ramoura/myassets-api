import {Asset} from "../src/domain/model/Asset";
import Portfolio from "../src/domain/model/Portfolio";
import Transaction from "../src/domain/model/Transaction";


test("should add a purchase transaction ", async () => {
    let quantity = 100;
    let unitValue = 10;
    let type = "BUY";
    const transaction = new Transaction("PETR4", quantity, unitValue, new Date(), type);

    const myPatrimony = new Portfolio();
    myPatrimony.addTransaction(transaction)

    expect(myPatrimony.getAssets().length).toBe(1);
    let asset = myPatrimony.getAsset("PETR4");

    expect(asset?.getQuantity()).toEqual(quantity);
    expect(asset?.getAvgPrice()).toEqual(unitValue);
});

test("should add a new purchase transaction ", async () => {
    const transaction = new Transaction("PETR4", 100, 10, new Date(), "BUY");
    const newPurchaseTransaction = new Transaction("PETR4",100, 7, new Date(), "BUY");

    const myPatrimony = new Portfolio();
    myPatrimony.addTransaction(transaction)
    myPatrimony.addTransaction(newPurchaseTransaction)

    expect(myPatrimony.getAssets().length).toBe(1);
    let asset = myPatrimony.getAsset("PETR4");

    expect(asset?.getQuantity()).toEqual(200);
    expect(asset?.getAvgPrice()).toEqual(8.5);
});



test("should add a purchase of a new Asset ", async () => {
    const transaction = new Transaction("PETR4", 100, 10, new Date(), "BUY");
    const newPurchaseTransaction = new Transaction("VALE3",100, 70, new Date(), "BUY");

    const myPatrimony = new Portfolio();
    myPatrimony.addTransaction(transaction)
    myPatrimony.addTransaction(newPurchaseTransaction)

    expect(myPatrimony.getAssets().length).toBe(2);
    let assetPetr = myPatrimony.getAsset("PETR4");
    let assetVale = myPatrimony.getAsset("VALE3");

    expect(assetPetr?.getQuantity()).toEqual(100);
    expect(assetPetr?.getAvgPrice()).toEqual(10);

    expect(assetVale?.getQuantity()).toEqual(100);
    expect(assetVale?.getAvgPrice()).toEqual(70);
});

test("should compute avg price of a new Asset ", async () => {
    const transaction = new Transaction("PETR4", 100, 10, new Date(), "BUY");
    const valeTransaction = new Transaction("VALE3",100, 70, new Date(), "BUY");
    const newPurchaseValeTransaction = new Transaction("VALE3",10, 110, new Date(), "BUY");

    const myPatrimony = new Portfolio();
    myPatrimony.addTransaction(transaction)
    myPatrimony.addTransaction(valeTransaction)
    myPatrimony.addTransaction(newPurchaseValeTransaction)

    expect(myPatrimony.getAssets().length).toBe(2);
    let assetPetr = myPatrimony.getAsset("PETR4");
    let assetVale = myPatrimony.getAsset("VALE3");

    expect(assetPetr).not.toBeUndefined();

    expect(assetVale?.getQuantity()).toEqual(110);
    expect(assetVale?.getAvgPrice()).toEqual(73.63636363636364);
});

test("should add a salas transaction ", async () => {
    const transaction = new Transaction("PETR4",
        100,
        10,
        new Date(),
        "BUY");

    const saleTransaction = new Transaction("PETR4",
        50,
        10,
        new Date(),
        "SALE");

    const myPatrimony = new Portfolio();
    myPatrimony.addTransaction(transaction)
    myPatrimony.addTransaction(saleTransaction)

    expect(myPatrimony.getAssets().length).toBe(1);
    let asset = myPatrimony.getAsset("PETR4");

    expect(asset?.getQuantity()).toEqual(50);
    expect(asset?.getAvgPrice()).toEqual(10);
});

test("When sall all the assets, they must be removed from the list ", async () => {
    const transaction = new Transaction("PETR4",
        100,
        10,
        new Date(),
        "BUY");

    const saleTransaction = new Transaction("PETR4",
        100,
        1,
        new Date(),
        "SALE");

    const myPatrimony = new Portfolio();
    myPatrimony.addTransaction(transaction)

    expect(myPatrimony.getAssets().length).toBe(1);
    let asset = myPatrimony.getAsset("PETR4");

    expect(asset?.getQuantity()).toEqual(100);
    expect(asset?.getAvgPrice()).toEqual(10);

    myPatrimony.addTransaction(saleTransaction)
    expect(myPatrimony.getAssets().length).toBe(0);
});

