import DtoStockInformation from './stock-information.dto'
import DtoDividend from './dividend.dto'

class DtoStock extends DtoStockInformation {
  dividends: DtoDividend[]

  constructor(
    name: string,
    symbol: string,
    isin: string,
    wkn: string,
    yearsOfNotLoweringTheDividend: number,
    dividendYield: number,
    avgThreeYearDividendGrowth: number,
    dividends: DtoDividend[]
  ) {
    super(name, symbol, isin, wkn, yearsOfNotLoweringTheDividend, dividendYield, avgThreeYearDividendGrowth)

    this.dividends = dividends
  }
}

export default DtoStock
