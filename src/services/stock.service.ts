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
  getStocks(minYearsOfNotLoweringTheDividend?: number, minDividendYield?: number): Promise<DtoStockInformation[]>

  getIsins(): Promise<string[]>

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

  getStocks = async (
    minYearsOfNotLoweringTheDividend?: number,
    minDividendYield?: number
  ): Promise<DtoStockInformation[]> => {
    let stocks = await this._stockRepositoryService.getStocks()

    if (minYearsOfNotLoweringTheDividend) {
      stocks = stocks.filter((stock) => stock.yearsOfNotLoweringTheDividend() >= minYearsOfNotLoweringTheDividend)
    }

    if (minDividendYield) {
      stocks = stocks.filter((stock) => stock.getCurrentDividendYield() >= minDividendYield)
    }

    return stocks.map((stock) => this.toDtoStockInformation(stock))
  }

  getIsins = async (): Promise<string[]> => {
    const stocks = await this._stockRepositoryService.getStocks()

    return stocks.map((stock) => stock.isin)
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
      stock.getCurrentDividendYield(),
      stock.getAvgDividendGrowth(3)
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
      stock.getCurrentDividendYield(),
      stock.getAvgDividendGrowth(3),
      dividends
    )
  }
}

export default StockService
