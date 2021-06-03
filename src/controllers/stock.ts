import 'reflect-metadata'
import { injectable, inject } from 'inversify'
import { IStockService } from '../services/stock'
import InversifyTypes from '../inversify.types'

export interface IStockController {
  getStock(req: any, res: any): Promise<void>
  getStocks(req: any, res: any): Promise<void>
  
  addStock(req: any, res: any): Promise<void>
}

@injectable()
export class StockController implements IStockController {
  private _stockService: IStockService

  constructor(@inject(InversifyTypes.IStockService) stockService: IStockService) {
    this._stockService = stockService
  }

  getStock = async (req: any, res: any): Promise<void> => {
    const {isin} = req.params
    
    res.json(await this._stockService.getStock(isin))
  }

  getStocks = async (req: any, res: any): Promise<void> => {
    res.json(await this._stockService.getStock('abc'))
  }
  
  addStock = async (req: any, res: any): Promise<void> => {
    const {isin} = req.params
    
    try {
      res.json(await this._stockService.addStock(isin))
    } catch (e) {
      res.sendStatus(500)
    }
  }
}
