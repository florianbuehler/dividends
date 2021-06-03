import { Container } from 'inversify'
import InversifyTypes from './inversify.types'
import { IStockController, StockController } from './controllers/stock'
import { IStockService, StockService } from './services/stock'

const container = new Container()
container.bind<IStockController>(InversifyTypes.IStockController).to(StockController)
container.bind<IStockService>(InversifyTypes.IStockService).to(StockService)

export default container
