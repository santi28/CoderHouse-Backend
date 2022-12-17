import express, { Router } from 'express'

const app = express()
const PORT = process.env.PORT || 8080

const productsRouter = Router()
const cartRouter = Router()

const authMiddleware = (req, res, next) => {
  const { authorization } = req.headers

  if (authorization) return next()
  return res.status(401).json({ error: 401, message: 'Unauthorized' })
}

// Middlewares
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

// Routes
app.use('/api/products', authMiddleware, productsRouter)
app.use('/api/cart', authMiddleware, cartRouter)

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

cartRouter.delete('/:id', (req, res) => {
  const { id } = req.params

  res.send(`This action will delete the cart with id: ${id}`)
})

cartRouter.get('/:id/products', (req, res) => {
  const { id } = req.params

  res.send(`This action will return all products from cart with id: ${id}`)
})

cartRouter.post('/:id/products', (req, res) => {
  const { id } = req.params

  res.send(`This action will add a new product to cart with id: ${id}`)
})

cartRouter.delete('/:id/products/:idProd', (req, res) => {
  const { id, idProd } = req.params

  res.send(
    `This action will delete the product with id: ${idProd} from cart with id: ${id}`
  )
})
// #endregion

app.listen(
  PORT,
  console.log(`🚀 Server running on url http://localhost:${PORT}`)
)
