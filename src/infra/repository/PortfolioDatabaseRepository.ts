import PortfolioRepository from "../../application/repository/PortfolioRepository";
import Portfolio from "../../domain/entity/Portfolio";
import {Collection, Db, MongoClient} from "mongodb";
import dotenv from "dotenv";
import * as process from "process";
import {Asset} from "../../domain/entity/Asset";

export default class PortfolioDatabaseRepository implements PortfolioRepository {
    private DEALS_COLLECTION_NAME: string = 'deals'
    private COUNTERS_COLLECTION_NAME: string = 'counters';

    private client: MongoClient = undefined as any;
    private deals: Collection = undefined as any;
    private counters: Collection = undefined as any;
    constructor() {
        this.connect();
    }

    async connect() {
        dotenv.config();
        console.log('connecting to mongo');

        try {
            if (!this.client) { // I added this extra check
                console.log('setting client URL:', process.env.DB_CONN_STRING);
                this.client = await MongoClient.connect(process.env.DB_CONN_STRING as string)
                const db: Db = this.client.db(process.env.DB_NAME);
                this.deals = db.collection(this.DEALS_COLLECTION_NAME);
                this.counters = db.collection(this.COUNTERS_COLLECTION_NAME);
                console.log(`Successfully connected to database: ${db.databaseName} and collection: ${this.deals.collectionName}`);
            }
        } catch (error) {
            console.log('error during connecting to mongo: ');
            console.error(error);
        }
    }

    async getPortfolio(user: string): Promise<Portfolio | undefined> {
        var portfolioDB = await this.deals.findOne(
            {user: user}
        );
        if (!portfolioDB) return undefined;
        return this.extracted(portfolioDB);
    }

    async savePortfolio(portfolio: Portfolio): Promise<Portfolio> {
        const userEntity = await this.deals.insertOne(portfolio);
        return portfolio;
    }

    private extracted(portfolioDB: any): Portfolio {
        const assets = portfolioDB.assets.map((asset: any) => {
            return Asset.of(
                asset.symbol,
                asset.exchange,
                asset.currency,
                asset.quantity,
                asset.avgPrice
            )
        })
        return new Portfolio(assets, portfolioDB.user);
    }
}