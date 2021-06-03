import { injectable } from 'inversify'

export interface IStockService {
  getStock(isin: string): Promise<string>
}

@injectable()
export class StockService implements IStockService {
  constructor() {}

  getStock = (isin: string): Promise<string> => {
    return new Promise<string>((resolve, reject) => {
      resolve(`The isin is ${isin}`)
    })
  }
}
