import { inject, injectable } from 'inversify'
import InversifyTypes from '../inversify.types'
import { IDividendDataAdapter } from '../adapters/dividend-data/dividend-data-adapter'
import { IStockRepositoryService } from '../models/repository/stock.repository'
import Stock from '../models/stock'
import Dividend from '../models/dividend'
import Money from '../models/money'
import DtoStockInformation from './stock-information.dto'
import { IStockPriceAdapter } from '../adapters/stock-price/stock-price-adapter'
import DtoStock from './stock.dto'
import DtoDividend from './dividend.dto'

export interface IStockService {
  getStock(isin: string): Promise<DtoStock>
  getStocks(minYearsOfNotLoweringTheDividend?: number): Promise<DtoStockInformation[]>

  addStock(isin: string): Promise<void>
}

@injectable()
class StockService implements IStockService {
  private readonly _dividendDataAdapter: IDividendDataAdapter
  private readonly _stockPriceAdapter: IStockPriceAdapter
  private readonly _stockRepositoryService: IStockRepositoryService

  constructor(
    @inject(InversifyTypes.IDividendDataAdapter) dividendDataAdapter: IDividendDataAdapter,
    @inject(InversifyTypes.IStockPriceAdapter) stockPriceAdapter: IStockPriceAdapter,
    @inject(InversifyTypes.IStockRepositoryService) stockRepositoryService: IStockRepositoryService
  ) {
    this._dividendDataAdapter = dividendDataAdapter
    this._stockPriceAdapter = stockPriceAdapter
    this._stockRepositoryService = stockRepositoryService
  }

  getStock = async (isin: string): Promise<DtoStock> => {
    const stock = await this._stockRepositoryService.getStock(isin)

    return this.toDtoStock(stock)
  }

  getStocks = async (minYearsOfNotLoweringTheDividend?: number): Promise<DtoStockInformation[]> => {
    const stocks = await this._stockRepositoryService.getStocks()

    return stocks.map((stock) => this.toDtoStockInformation(stock))
  }

  addStock = async (isin: string): Promise<void> => {
    const dividendInformation = await this._dividendDataAdapter.getDividendData(isin)
    const stockPrice = await this._stockPriceAdapter.getStockPrice(dividendInformation.symbol, dividendInformation.isin)

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
      stockPrice,
      dividends
    )

    await this._stockRepositoryService.addStock(stock)
  }

  private toDtoStockInformation = (stock: Stock): DtoStockInformation => {
    return new DtoStockInformation(
      stock.name,
      stock.symbol,
      stock.isin,
      stock.wkn,
      stock.yearsOfNotLoweringTheDividend(),
      stock.getDividendYield()
    )
  }

  private toDtoDividend = (dividend: Dividend): DtoDividend => {
    return new DtoDividend(dividend.payDate, dividend.amount)
  }

  private toDtoStock = (stock: Stock): DtoStock => {
    const dividends = stock.dividends.map((dividend) => this.toDtoDividend(dividend))

    return new DtoStock(
      stock.name,
      stock.symbol,
      stock.isin,
      stock.wkn,
      stock.yearsOfNotLoweringTheDividend(),
      stock.getDividendYield(),
      dividends
    )
  }
}

export default StockService
