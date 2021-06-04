class DtoStockInformation {
  name: string
  symbol: string
  isin: string
  wkn: string
  yearsOfNotLoweringTheDividend: number
  dividendYield: number

  constructor(
    name: string,
    symbol: string,
    isin: string,
    wkn: string,
    yearsOfNotLoweringTheDividend: number,
    dividendYield: number
  ) {
    this.name = name
    this.symbol = symbol
    this.isin = isin
    this.wkn = wkn
    this.yearsOfNotLoweringTheDividend = yearsOfNotLoweringTheDividend
    this.dividendYield = dividendYield
  }
}

export default DtoStockInformation
