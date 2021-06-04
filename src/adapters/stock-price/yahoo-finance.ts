import { injectable } from 'inversify'
import { IStockPriceAdapter } from './stock-price-adapter'
import Money from '../../models/money'

@injectable()
class YahooFinance implements IStockPriceAdapter {
  private static BASEURL = 'https://query1.finance.yahoo.com/v8/finance/chart'

  getStockPrice = async (symbol: string): Promise<Money> => {
    return new Money(1, 'EUR')
  }
}

export default YahooFinance
