import express from 'express'
import productsRouter from './routes/products.router.js'
import connect from './schemas/index.js'

const app = express()
const port = 3000

connect()

app.use(express.json())
app.use(express.urlencoded({extended:true}))

const router = express.Router()


app.use('/api', [router, productsRouter])

app.listen(port, () => {
    console.log(port, '서버 열림')
})