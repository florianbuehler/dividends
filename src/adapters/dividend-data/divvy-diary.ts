import { injectable } from 'inversify'
import fetch from 'node-fetch'
import { IDividendDataAdapter } from './dividend-data-adapter'
import { DividendInformation } from './types'

@injectable()
class DivvyDiary implements IDividendDataAdapter {
  private static BASEURL = 'https://api.divvydiary.com'

  getDividendData = async (isin: string): Promise<DividendInformation> => {
    try {
      const res = await fetch(`${DivvyDiary.BASEURL}/symbols/${isin}`)
      const body = await res.json()

      return body as DividendInformation
    } catch (e) {
      console.log(e)
    }
  }
}

export default DivvyDiary
