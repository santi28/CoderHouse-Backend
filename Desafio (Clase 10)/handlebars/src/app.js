const express = require('express');
const Container = require('./Contenedor');
const handlebars = require('express-handlebars');

const app = express();
const port = process.env.PORT || 8080;
const container = new Container('./src/productos.json');

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.engine(
  'hbs',
  handlebars.engine({
    extname: '.hbs',
    defaultLayout: 'index.hbs',
    layoutsDir: __dirname + '/views/layouts',
    partialsDir: __dirname + '/views/partials'
  })
);

app.set('views', './src/views');
app.set('view engine', 'hbs');

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