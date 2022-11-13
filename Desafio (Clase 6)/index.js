const express = require('express');
const Contenedor = require('./Contenedor');

const app = express();

const PORT = 8080; // Puerto por defecto
const container = new Contenedor('productos.json');

// Añade los productos al archivo
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

app.get('/productos', async (req, res) => {
  const products = await container.getAll();
  res.json(products);
});

app.get('/productoRandom', async (req, res) => {
  const products = await container.getAll();
  const randomProduct = products[Math.floor(Math.random() * products.length)];
  res.json(randomProduct);
});

app.listen(PORT, async () => {
  await addProducts();
  console.log(`Servidor express escuchando en el puerto ${PORT}`);
});