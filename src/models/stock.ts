import Dividend from './dividend'
import Money from './money'

class Stock {
  static baseYear = 2020 // Todo this is only a hack for now

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

    this.dividends.forEach((dividend) => {
      if (dividend.amount.currency !== price.currency) {
        throw new Error('Different currencies for dividends and stock price!')
      }
    })
  }

  yearsOfNotLoweringTheDividend(): number {
    let currentYear = Stock.baseYear
    let payedDividendsCurrentYear = this.getDividendsForYear(currentYear).value

    if (!payedDividendsCurrentYear) {
      return 0
    }

    let yearsOfNotLowering = 0

    while (true) {
      const lastYear = currentYear - 1
      const payedDividendsLastYear = this.getDividendsForYear(lastYear).value

      if (!payedDividendsLastYear) {
        return yearsOfNotLowering + 1
      }

      if (payedDividendsCurrentYear >= payedDividendsLastYear) {
        payedDividendsCurrentYear = payedDividendsLastYear
        currentYear = lastYear
        yearsOfNotLowering++
      } else {
        break
      }
    }

    return yearsOfNotLowering
  }

  getCurrentDividendYield(): number {
    return this.getDividendsForYear(Stock.baseYear).value / this.price.value
  }

  getDividendsForYear(year: number): Money {
    const dividendsOfYear = this.dividends
      .filter((dividend) => dividend.payDate.getFullYear() === year)
      .reduce((current, dividend) => current + (dividend.amount.value || 0), 0)

    return new Money(dividendsOfYear, this.price.currency)
  }

  getAvgDividendGrowth(year = 1): number {
    const currentDividends = this.getDividendsForYear(Stock.baseYear).value
    const baseDividends = this.getDividendsForYear(Stock.baseYear - year).value

    if (!currentDividends || !baseDividends) {
      return NaN
    }

    return Math.pow(currentDividends / baseDividends, 1 / year) - 1
  }
}

export default Stock
