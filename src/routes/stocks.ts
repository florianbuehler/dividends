import * as express from 'express'
import stocksController from '../controllers/stocks'

const stockRouter = express.Router()

stockRouter.route('/:id').get(stocksController.getStocks)

export default stockRouter
