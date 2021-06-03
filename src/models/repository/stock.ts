import { inject, injectable } from 'inversify'
import InversifyTypes from '../../inversify.types'
import { IDatabaseAdapterService } from './database-adapter/database-adapter'
import Stock from '../stock'
import DboStock from './stock.dbo'
import Dividend from '../dividend'
import Money from '../money'

export interface IStockRepositoryService {
  getStock(isin: string): Promise<Stock>
  addStock(stock: Stock): Promise<void>
}

@injectable()
export class StockRepositoryService implements IStockRepositoryService {
  private readonly _databaseAdapterService: IDatabaseAdapterService

  private readonly stocksCollectionName = 'stocks'

  constructor(@inject(InversifyTypes.IDatabaseAdapterService) databaseAdapterService: IDatabaseAdapterService) {
    this._databaseAdapterService = databaseAdapterService
  }

  async getStock(isin: string): Promise<Stock> {
    const query = {
      isin: isin
    }

    const stocks = await this._databaseAdapterService.getItemsFromCollection<DboStock>(this.stocksCollectionName, query)

    const dboStock = stocks[0]

    const dividends = dboStock.dividends.map(
      (dividend) =>
        new Dividend(
          dividend.id,
          dividend.exDate,
          dividend.payDate,
          new Money(dividend.amount.value, dividend.amount.currency)
        )
    )

    return new Stock(dboStock.name, dboStock.symbol, dboStock.isin, dboStock.wkn, dboStock.exchange, dividends)
  }

  async addStock(stock: Stock): Promise<void> {
    const query = {
      isin: stock.isin
    }

    await this._databaseAdapterService.upsertItemInCollection(stock, this.stocksCollectionName, query)
  }
}
