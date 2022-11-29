const express = require('express');
const Container = require('./Contenedor');

const app = express();
const port = process.env.PORT || 8080;
const container = new Container('./src/productos.json');

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.set('views', './src/views');
app.set('view engine', 'ejs');

app.get('/', async (req, res) => {
  res.render('post')
})

app.get('/productos', async (req, res) => {
  console.log(await container.getAll());
  res.render('list', { productos: await container.getAll() });
});

app.post('/productos', async (req, res) => {
  const { title, price, thumbnail } = req.body;
  const id = await container.save({ title, price, thumbnail });
  res.redirect('/')
});

app.listen(port, console.log(`🚀 Server running at http://localhost:${port} 👨‍🚀`));