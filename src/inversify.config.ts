import { Container } from 'inversify'
import InversifyTypes from './inversify.types'
import { IStockController, StockController } from './controllers/stock'
import { IStockService, StockService } from './services/stock'
import { DivvyDiary } from './adapters/dividend-data/divvy-diary'
import { IDividendDataAdapter } from './adapters/dividend-data/dividend-data-adapter'

const container = new Container()

container.bind<IStockController>(InversifyTypes.IStockController).to(StockController)
container.bind<IStockService>(InversifyTypes.IStockService).to(StockService)
container.bind<IDividendDataAdapter>(InversifyTypes.IDividendDataAdapter).to(DivvyDiary)

export default container
