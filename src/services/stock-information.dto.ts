class DtoStockInformation {
  name: string
  symbol: string
  isin: string
  wkn: string
  yearsOfNotLoweringTheDividend: number
  dividendYield: number
  avgThreeYearDividendGrowth: number

  constructor(
    name: string,
    symbol: string,
    isin: string,
    wkn: string,
    yearsOfNotLoweringTheDividend: number,
    dividendYield: number,
    avgThreeYearDividendGrowth: number
  ) {
    this.name = name
    this.symbol = symbol
    this.isin = isin
    this.wkn = wkn
    this.yearsOfNotLoweringTheDividend = yearsOfNotLoweringTheDividend
    this.dividendYield = dividendYield
    this.avgThreeYearDividendGrowth = avgThreeYearDividendGrowth
  }
}

export default DtoStockInformation
