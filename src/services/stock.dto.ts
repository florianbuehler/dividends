import DtoStockInformation from './stock-information.dto'
import DtoDividend from './dividend.dto'
import DtoDividendInformation from './dividend-information.dto'

class DtoStock extends DtoStockInformation {
  dividends: DtoDividend[]

  constructor(
    name: string,
    symbol: string,
    isin: string,
    wkn: string,
    dividendInformation: DtoDividendInformation,
    dividends: DtoDividend[]
  ) {
    super(name, symbol, isin, wkn, dividendInformation)

    this.dividends = dividends
  }
}

export default DtoStock
