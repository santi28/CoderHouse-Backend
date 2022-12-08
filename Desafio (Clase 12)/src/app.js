const path = require('path');
const http = require('http');

const express = require('express');
const handlebars = require('express-handlebars');
const { Server } = require('socket.io');

const Contenedor = require('./Contenedor');

const app = express();
const server = http.createServer(app);
const io = new Server(server);

const PORT = process.env.PORT || 8080;
const contenedor = new Contenedor('./src/productos.json');
const chats = new Contenedor('./src/chats.json');

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Configuración de handlebars
app.engine(
  'hbs',
  handlebars.engine({
    extname: '.hbs',
    defaultLayout: 'index.hbs',
    layoutsDir: __dirname + '/views/layouts',
    partialsDir: __dirname + '/views/partials',
  })
);

app.set('view engine', 'hbs');
app.set('views', './src/views');

// Estaticos
app.use(express.static(path.join(__dirname, 'public')));

// Websockets
io.on('connection', async (socket) => {
  console.log('👨‍🚀 New client connected');

  const productos = await contenedor.getAll();
  socket.emit('productos', productos);

  const messages = await chats.getAll();
  socket.emit('messages', messages);

  socket.on('new-product', async (data) => {
    const productId = await contenedor.save(data);
    const product = await contenedor.getById(productId);

    io.sockets.emit('update-products', product);
  });

  socket.on('new-message', async ({ senderMail, message }) => {
    const messageId = await chats.save({ senderMail, message, date: new Date().getTime() });
    const chatMessage = await chats.getById(messageId);

    io.sockets.emit('update-messages', chatMessage);
  });

  socket.on('disconnect', () => console.log('🚀 Client disconnected'))
});

// Rutas
app.get('/', async (req, res) => {
  const productos = await contenedor.getAll();
  res.render('main', { productos });
});

server.listen(PORT, () => console.log(`🚀 Server running at http://localhost:${PORT} 👨‍🚀`));