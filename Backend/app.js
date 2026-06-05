const express = require('express');
const cors = require('cors')
const usersRouter = require('./Routes/users');
const productsRouter = require('./Routes/products');
const ordersRouter = require('./Routes/orders');
const authRouter = require('./Routes/auth');
const categoriesRouter = require('./Routes/categories')
require('dotenv').config(); 

const app = express();
app.use(cors())
app.use(express.json());

app.use('/users', usersRouter);

app.use('/products', productsRouter);

app.use('/orders', ordersRouter);

app.use('/auth', authRouter);

app.use('/categories', categoriesRouter);

app.listen(3000, () => {
    console.log('Servidor corriendo en el puerto 3000');
})