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

  yearsOfNotLoweringTheDividend(): number {
    let currentYear = 2020 // Todo this is only a hack for now
    let payedDividendsCurrentYear = this.dividendsForYear(currentYear)

    if (!payedDividendsCurrentYear) {
      return 0
    }

    let yearsOfNotLowering = 0

    while (true) {
      const lastYear = currentYear - 1
      const payedDividendsLastYear = this.dividendsForYear(lastYear)

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

  dividendsForYear(year: number) {
    const dividendsOfYear = this.dividends.filter((dividend) => dividend.payDate.getFullYear() === year)
    return dividendsOfYear.reduce((current, dividend) => current + (dividend.amount.value || 0), 0)
  }
}

export default Stock
