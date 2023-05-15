//create test from ImportAssetTransactions.ts file and add the following code:


import CsvTransactionReader from "../../src/infra/CsvTransactionReader";
import ImportAssetTransactions from "../../src/application/ImportAssetTransactions";
import PortfolioRepository from "../../src/application/repository/PortfolioRepository";
import Portfolio from "../../src/domain/entity/Portfolio";
import fs from "fs";

describe("ImportAssetTransactions", () => {
    describe("execute", () => {
        it("should import transactions from the csv file", async () => {
            const mockPortfolioRepository: PortfolioRepository = {
                getPortfolio: jest.fn().mockResolvedValue(new Portfolio()),
                savePortfolio: jest.fn().mockResolvedValue(new Portfolio())
            };

            const csvData = "Data operação,Categoria,Código Ativo,Operação C/V,Quantidade,Preço unitário,Corretora,Corretagem,Taxas,Impostos,IRRF,Origem\n" +
                "04/04/2023,Fundos imobiliários,MXRF11,C,\"14,00000000\",\"10,30\",INTER DTVM LTDA,\"0,00\",\"0,00\",\"0,00\",\"0,00\"\n" +
                "03/04/2023,Ações,TASA4,C,\"1,00000000\",\"16,14\",CLEAR CORRETORA,\"0,00\",\"0,00\",\"0,00\",\"0,00\"\n" +
                "03/04/2023,Ações,AESB3,C,\"1,00000000\",\"9,88\",CLEAR CORRETORA,\"0,00\",\"0,00\",\"0,00\",\"0,00\"\n" +
                "15/03/2023,Fundos imobiliários,MXRF11,C,\"10,00000000\",\"10,28\",INTER DTVM LTDA,\"0,00\",\"0,00\",\"0,00\",\"0,00\"\n";
            const transactionReader = new CsvTransactionReader();
            const importAssetTransactions = new ImportAssetTransactions(transactionReader, mockPortfolioRepository);
            await importAssetTransactions.execute("user", csvData);

            const savePortfolioMock = mockPortfolioRepository.savePortfolio as jest.Mock;

            expect(savePortfolioMock).toHaveBeenCalled();
            expect(savePortfolioMock.mock.calls[0][0].assets).toHaveLength(3);

        });
    });
});
