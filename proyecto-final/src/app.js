import express, { Router } from 'express'

const app = express()
const PORT = process.env.PORT || 8080

const productsRouter = Router()
const cartRouter = Router()

// Middlewares
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

// Routes
app.use('/api/products', productsRouter)
app.use('/api/users', cartRouter)

// #region Products Router
productsRouter.get('/:id?', (req, res) => {
  const { id } = req.params

  if (id) res.send(`This action will return the product with id: ${id}`)
  else res.send('This action will return all products')
})

productsRouter.post('/', (req, res) => {
  res.send('This action will create a new product')
})

productsRouter.put('/:id', (req, res) => {
  const { id } = req.params

  res.send(`This action will update the product with id: ${id}`)
})

productsRouter.delete('/:id', (req, res) => {
  const { id } = req.params

  res.send(`This action will delete the product with id: ${id}`)
})
// #endregion

// #region Cart Router
cartRouter.post('/', (req, res) => {
  res.send('This action will create a new cart')
})

cartRouter.get('/:id/productos', (req, res) => {
  const { id } = req.params

  res.send(`This action will return all products from cart with id: ${id}`)
})

cartRouter.post('/:id/productos', (req, res) => {
  const { id } = req.params

  res.send(`This action will add a new product to cart with id: ${id}`)
})

cartRouter.delete('/:id/productos/:idProd', (req, res) => {
  const { id, idProd } = req.params

  res.send(
    `This action will delete the product with id: ${idProd} from cart with id: ${id}`
  )
})
// #endregion

app.listen(
  3000,
  console.log(
    `🚀 Server running on url http://localhost:${PORT} 👨‍🚀 Good Luck Astronaut!`
  )
)
