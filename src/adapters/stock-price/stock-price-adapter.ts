import Money from '../../models/money'

export interface IStockPriceAdapter {
  getStockPrice(symbol: string, isin: string): Promise<Money>
}
