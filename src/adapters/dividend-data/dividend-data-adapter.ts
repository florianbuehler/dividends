import { DividendInformation } from './types'

export interface IDividendDataAdapter {
  getDividendData(isin: string): Promise<DividendInformation>
}
