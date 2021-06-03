import Dividend from './dividend'

class Stock {
  name: string
  symbol: string
  isin: string
  wkn: string
  exchange: string
  dividends: Dividend[]

  constructor(name: string, symbol: string, isin: string, wkn: string, exchange: string, dividends: Dividend[]) {
    this.name = name
    this.symbol = symbol
    this.isin = isin
    this.wkn = wkn
    this.exchange = exchange
    this.dividends = dividends
  }
}

export default Stock
