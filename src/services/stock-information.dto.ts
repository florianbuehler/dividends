import DtoDividendInformation from './dividend-information.dto'

class DtoStockInformation {
  name: string
  symbol: string
  isin: string
  wkn: string
  dividendInformation: DtoDividendInformation

  constructor(name: string, symbol: string, isin: string, wkn: string, dividendInformation: DtoDividendInformation) {
    this.name = name
    this.symbol = symbol
    this.isin = isin
    this.wkn = wkn
    this.dividendInformation = dividendInformation
  }
}

export default DtoStockInformation
