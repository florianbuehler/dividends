const express = require('express')
const stocksController = require('../controllers/stocks')

const router = express.Router()

router.route('/:id').get(stocksController.getStocks)

module.exports = router
