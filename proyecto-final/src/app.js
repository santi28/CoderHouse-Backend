import express, { Router } from 'express'
import Contenedor from './Contenedor.js'

const app = express()
const PORT = process.env.PORT || 8080

const productsContainer = new Contenedor('./data/products.json')

const productsRouter = Router()
const cartRouter = Router()

const authMiddleware = (req, res, next) => {
  const { administrator } = req.headers

  if (administrator) return next()
  return res.status(401).json({ error: 401, message: 'Unauthorized' })
}

// Middlewares
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

// Routes
app.use('/api/products', productsRouter)
app.use('/api/cart', authMiddleware, cartRouter)

// #region Products Router
productsRouter.get('/:id?', async (req, res) => {
  const { id } = req.params

  if (id) {
    const product = await productsContainer.getById(+id)
    if (!product)
      return res.status(404).json({ error: 404, message: 'Product not found' })

    return res.json(product)
  } else {
    const products = await productsContainer.getAll()
    return res.json(products)
  }
})

productsRouter.post('/', authMiddleware, async (req, res) => {
  const { name, description, code, picture, price, stock } = req.body

  if (!name || !description || !code || !picture || !price || !stock)
    return res.status(400).json({
      error: 400,
      message: 'Mandatory fileds are missing'
    })

  const newProduct = { name, description, code, picture, price, stock }
  newProduct.timestamp = Date.now()

  const newProductId = await productsContainer.save(newProduct)
  const product = await productsContainer.getById(newProductId)

  return res.status(201).json(product)
})

productsRouter.put('/:id', async (req, res) => {
  const { id } = req.params
  const { name, description, code, picture, price, stock } = req.body
  const productBody = { name, description, code, picture, price, stock }

  try {
    const productId = await productsContainer.updateById(+id, productBody)
    const product = await productsContainer.getById(productId)

    return res.json(product)
  } catch (err) {
    return res
      .status(500)
      .json({ error: 500, message: 'Internal server error' })
  }
})

productsRouter.delete('/:id', async (req, res) => {
  const { id } = req.params
  await productsContainer.deleteById(+id)

  return res.status(204).end()
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
