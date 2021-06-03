import { injectable } from 'inversify'

export interface IStockService {
  getStock(isin: string): Promise<string>
  
  addStock(isin: string): Promise<string>
}

@injectable()
export class StockService implements IStockService {
  getStock = (isin: string): Promise<string> => {
    return new Promise<string>((resolve, reject) => {
      resolve(`The isin is ${isin}`)
    })
  }
  
  addStock = (isin: string): Promise<string> => {
    return new Promise<string>((resolve, reject) => {
      resolve(`The new stock has isin: ${isin}`)
    })
  }
}
