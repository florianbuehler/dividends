class DtoStockInformation {
  name: string
  symbol: string
  isin: string
  wkn: string
  yearsOfNotLoweringTheDividend: number

  constructor(name: string, symbol: string, isin: string, wkn: string, yearsOfNotLoweringTheDividend: number) {
    this.name = name
    this.symbol = symbol
    this.isin = isin
    this.wkn = wkn
    this.yearsOfNotLoweringTheDividend = yearsOfNotLoweringTheDividend
  }
}

export default DtoStockInformation
