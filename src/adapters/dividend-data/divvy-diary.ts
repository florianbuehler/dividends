import { injectable } from 'inversify'
import fetch from 'node-fetch'
import { IDividendDataAdapter } from './dividend-data-adapter'
import { DividendStock } from './types'

@injectable()
export class DivvyDiary implements IDividendDataAdapter {
  private static BASEURL = 'https://api.divvydiary.com'

  getDividendData = async (isin: string): Promise<DividendStock> => {
    try {
      const res = await fetch(`${DivvyDiary.BASEURL}/symbols/${isin}`)
      const body = await res.json()

      return body as DividendStock
    } catch (e) {
      console.log(e)
    }
  }
}
