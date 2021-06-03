import 'reflect-metadata'
import { injectable, inject } from 'inversify'
import { IStockService } from '../services/stock'
import InversifyTypes from '../inversify.types'

export interface IStockController {
  getStock(req: any, res: any): Promise<void>
  getStocks(req: any, res: any): void
}

@injectable()
export class StockController implements IStockController {
  private _stockService: IStockService

  constructor(@inject(InversifyTypes.IStockService) stockService: IStockService) {
    this._stockService = stockService
  }

  getStock = async (req: any, res: any): Promise<void> => {
    res.json(await this._stockService.getStock('abc'))
  }

  getStocks(req: any, res: any) {
    res.json({ hello: 'world2' })
  }
}
