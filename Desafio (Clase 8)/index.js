const express = require('express');
const Contenedor = require('./Contenedor');
const app = express();
const routerProductos = express.Router();

const PORT = 8080; // Puerto por defecto
const container = new Contenedor('productos.json');

const addProducts = async () => {
  const products = [
    {
      title: 'Computadora',
      price: 1000,
      thumbnail: 'https://www.ncbi.ie/wp-content/uploads/2021/01/buying-your-first-desktop-computer.jpg',
    },
    {
      title: 'Celular',
      price: 500,
      thumbnail: 'https://cdn.thewirecutter.com/wp-content/media/2021/08/budget-android-phone-2048px-nord-front.jpg',
    },
    {
      title: 'Tablet',
      price: 300,
      thumbnail: 'https://www.lenovo.com/medias/mkt-hero.png?context=bWFzdGVyfHJvb3R8MjM1NTEwfGltYWdlL3BuZ3xoNzIvaDBmLzE1ODY4NzEwOTQ0Nzk4LnBuZ3xmNzRmYmVmYmI5YTljMTI0OTY2MzRlNTgzYWRiZjE0MDVmMjI2ODZmN2E0M2FjNjQ5NDRmNjQ1Y2ZmOGVlNWQz',
    },
  ];

  for (const product of products) {
    await container.save(product);
  }
}

app.use(express.json());

routerProductos.get('/', async (req, res) => {
  const products = await container.getAll();
  res.json(products);
});

routerProductos.get('/:id', async (req, res) => {
  const id = req.params.id;
  const product = await container.getById(Number(id));

  if (!product) 
    return res.status(404).json({ error: 'Producto no encontrado' });

  res.json(product);
});

routerProductos.post('/', async (req, res) => {
  console.log("POST /productos");
  console.log(req.body);
  const { title, price, thumbnail } = req.body;

  if (!title || !price || !thumbnail)
    return res.status(400).json({ error: 'Existen datos faltantes' });

  const product = { title, price, thumbnail };
  const id = await container.save(product);

  res.status(201).json({ id, ...product });
});

routerProductos.put('/:id', async (req, res) => {
  const id = req.params.id;
  const { title, price, thumbnail } = req.body;

  try {
    await container.updateById(
      Number(id), 
      { title, price, thumbnail }
    );
  
    const updatedProduct = await container.getById(Number(id));
    res.json(updatedProduct);
  } catch (error) {
    res.status(404).json({ error: error.message });
  }
});

routerProductos.delete('/:id', async (req, res) => {
  const id = req.params.id;

  try {
    await container.deleteById(Number(id));
    res.status(204).end();
  } catch (error) {
    res.status(404).json({ error: error.message });
  }
});

app.use('/api/productos', routerProductos);
app.use('/static', express.static('public'));

app.listen(PORT, async () => {
  await addProducts();
  console.log(`Server listen on port http://localhost:${PORT}`);
});
