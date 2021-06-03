import * as express from 'express'
import container from '../inversify.config'
import InversifyTypes from '../inversify.types'
import { IStockController } from '../controllers/stock'

const stockRouter = express.Router()
const stockController = container.get<IStockController>(InversifyTypes.IStockController)

stockRouter.route('/').get(stockController.getStocks)
stockRouter.route('/:isin').get(stockController.getStock).post(stockController.addStock)

export default stockRouter
