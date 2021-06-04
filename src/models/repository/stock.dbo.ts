import Dividend from '../dividend'
import Money from '../money'

class DboStock {
  name: string
  symbol: string
  isin: string
  wkn: string
  exchange: string
  price: Money
  dividends: Dividend[]

  constructor(
    name: string,
    symbol: string,
    isin: string,
    wkn: string,
    exchange: string,
    price: Money,
    dividends: Dividend[]
  ) {
    this.name = name
    this.symbol = symbol
    this.isin = isin
    this.wkn = wkn
    this.exchange = exchange
    this.price = price
    this.dividends = dividends
  }
}

export default DboStock
