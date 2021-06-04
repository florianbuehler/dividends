import { injectable } from 'inversify'
import fetch from 'node-fetch'
import { IStockPriceAdapter } from './stock-price-adapter'
import Money from '../../models/money'

@injectable()
class YahooFinance implements IStockPriceAdapter {
  private static BASEURL = 'https://query1.finance.yahoo.com/v8/finance/chart'

  getStockPrice = async (symbol: string, isin: string): Promise<Money> => {
    const res = await fetch(`${YahooFinance.BASEURL}/${this.getQuerySymbol(symbol, isin)}`)
    const body = await res.json()
    const meta = body.chart.result[0].meta

    return new Money(meta.regularMarketPrice, meta.currency)
  }

  private getQuerySymbol = (symbol: string, isin: string): string => {
    let postfix: string

    switch (isin.substring(0, 2)) {
      case 'DE':
        postfix = 'DE'
        break
      default:
        postfix = ''
    }

    return postfix ? `${symbol}.${postfix}` : symbol
  }
}

export default YahooFinance
