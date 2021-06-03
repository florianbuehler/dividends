import "reflect-metadata";
import { injectable, inject } from "inversify";
import {IStockService} from '../services/stock'
import InversifyTypes from '../inversify.types'

export interface IStockController {
  getStock(req: any, res: any): void
  getStocks(req: any, res: any): void
}

@injectable()
export class StockController implements IStockController {
  private _stockService: IStockService
  
  constructor(@inject(InversifyTypes.IStockService) stockService: IStockService) {
    this._stockService = stockService
  }

  getStock(req: any, res: any): void {
    res.json(this._stockService.getStock('abc'))
  }
  
  getStocks(req: any, res: any) {
    res.json({ hello: 'world2' })}
}


