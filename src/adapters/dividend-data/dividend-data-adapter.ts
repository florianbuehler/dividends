import { DividendStock } from './types'

export interface IDividendDataAdapter {
  getDividendData(isin: string): Promise<DividendStock>
}
