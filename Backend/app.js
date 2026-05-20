const db = require('./db');
const express = require('express');
const usersRouter = require('./Routes/users');
const productsRouter = require('./Routes/products');
const ordersRouter = require('./Routes/orders');
const authRouter = require('./Routes/auth');
require('dotenv').config(); 

const app = express();
app.use(express.json());

app.use('/users', usersRouter);

app.use('/products', productsRouter);

app.use('/orders', ordersRouter);

app.use('/auth', authRouter);

app.listen(3000, () => {
    console.log('Servidor corriendo en el puerto 3000');
})