import { Container, interfaces } from 'inversify'
import InversifyTypes from './inversify.types'
import { IStockController, StockController } from './controllers/stock'
import { IStockService, StockService } from './services/stock'
import { DivvyDiary } from './adapters/dividend-data/divvy-diary'
import { IDividendDataAdapter } from './adapters/dividend-data/dividend-data-adapter'
import { IStockRepositoryService, StockRepositoryService } from './models/repository/stock'
import { LowDbAdapterService } from './models/repository/database-adapter/lowdb-adapter'
import { IDatabaseAdapterService } from './models/repository/database-adapter/database-adapter'

const dbFilePath = 'C:\\Users\\flori\\Desktop\\dividends\\db.json'

const container = new Container()

container.bind<IStockController>(InversifyTypes.IStockController).to(StockController)
container.bind<IStockService>(InversifyTypes.IStockService).to(StockService)
container.bind<IDividendDataAdapter>(InversifyTypes.IDividendDataAdapter).to(DivvyDiary)
container.bind<IStockRepositoryService>(InversifyTypes.IStockRepositoryService).to(StockRepositoryService)
container
  .bind<IDatabaseAdapterService>(InversifyTypes.IDatabaseAdapterService)
  .toDynamicValue((context: interfaces.Context) => new LowDbAdapterService(dbFilePath))

export default container
