import * as express from 'express'
import * as bodyParser from 'body-parser'

// routes
import stockRoutes from './routes/stocks'
import noMatchRoute from './routes/404'

// create an instance of express to serve our end points
const app = express()

// configure our express instance with some body-parser settings
// including handling JSON data
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

app.use('/stocks', stockRoutes)
app.use('/', noMatchRoute)

app.listen(3000, () => {
  console.log('Serving on port 3000')
})
