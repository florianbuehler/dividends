import { inject, injectable } from 'inversify'
import InversifyTypes from '../inversify.types'
import { IDividendDataAdapter } from '../adapters/dividend-data/dividend-data-adapter'
import { IStockRepositoryService } from '../models/repository/stock.repository'
import Stock from '../models/stock'
import Dividend from '../models/dividend'
import Money from '../models/money'
import DtoStockInformation from './stock-information.dto'

export interface IStockService {
  getStock(isin: string): Promise<void>
  getStocks(minYearsOfNotLoweringTheDividend?: number): Promise<DtoStockInformation[]>

  addStock(isin: string): Promise<void>
}

@injectable()
class StockService implements IStockService {
  private readonly _dividendDataAdapter: IDividendDataAdapter
  private readonly _stockRepositoryService: IStockRepositoryService

  constructor(
    @inject(InversifyTypes.IDividendDataAdapter) dividendDataAdapter: IDividendDataAdapter,
    @inject(InversifyTypes.IStockRepositoryService) stockRepositoryService: IStockRepositoryService
  ) {
    this._dividendDataAdapter = dividendDataAdapter
    this._stockRepositoryService = stockRepositoryService
  }

  getStock = async (isin: string): Promise<void> => {
    const stock = await this._stockRepositoryService.getStock(isin)

    console.log(stock.yearsOfNotLoweringTheDividend())
  }

  getStocks = async (minYearsOfNotLoweringTheDividend?: number): Promise<DtoStockInformation[]> => {
    const stocks = await this._stockRepositoryService.getStocks()

    return stocks.map((stock) => this.toDto(stock))
  }

  addStock = async (isin: string): Promise<void> => {
    const dividendInformation = await this._dividendDataAdapter.getDividendData(isin)

    const dividends = dividendInformation.dividends.map(
      (dividend) =>
        new Dividend(
          dividend.id,
          new Date(dividend.exDate),
          new Date(dividend.payDate),
          new Money(dividend.amount, dividend.currency)
        )
    )

    const stock = new Stock(
      dividendInformation.name,
      dividendInformation.symbol,
      dividendInformation.isin,
      dividendInformation.wkn,
      dividendInformation.exchange,
      dividends
    )

    await this._stockRepositoryService.addStock(stock)
  }

  private toDto = (stock: Stock): DtoStockInformation => {
    return new DtoStockInformation(
      stock.name,
      stock.symbol,
      stock.isin,
      stock.wkn,
      stock.yearsOfNotLoweringTheDividend()
    )
  }
}

export default StockService
