import { inject, injectable } from 'inversify'
import InversifyTypes from '../inversify.types'
import { IDividendDataAdapter } from '../adapters/dividend-data/dividend-data-adapter'

export interface IStockService {
  getStock(isin: string): Promise<string>

  addStock(isin: string): Promise<string>
}

@injectable()
export class StockService implements IStockService {
  private readonly _dividendDataAdapter: IDividendDataAdapter

  constructor(@inject(InversifyTypes.IDividendDataAdapter) dividendDataAdapter: IDividendDataAdapter) {
    this._dividendDataAdapter = dividendDataAdapter
  }

  getStock = (isin: string): Promise<string> => {
    return new Promise<string>((resolve, reject) => {
      resolve(`The isin is ${isin}`)
    })
  }

  addStock = async (isin: string): Promise<string> => {
    const stock = await this._dividendDataAdapter.getDividendData(isin)

    console.log(stock)

    return new Promise<string>((resolve, reject) => {
      resolve(`The new stock has isin: ${isin}`)
    })
  }
}
