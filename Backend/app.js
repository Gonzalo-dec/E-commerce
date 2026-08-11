const express = require('express');
const cors = require('cors')
const usersRouter = require('./Routes/users');
const productsRouter = require('./Routes/products');
const ordersRouter = require('./Routes/orders');
const authRouter = require('./Routes/auth');
const categoriesRouter = require('./Routes/categories')
const path = require('path');
require('dotenv').config(); 

const PORT = process.env.PORT || 3000;

const app = express();
app.use(cors())
app.use(express.json());

app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

app.use('/users', usersRouter);

app.use('/products', productsRouter);

app.use('/orders', ordersRouter);

app.use('/auth', authRouter);

app.use('/categories', categoriesRouter);

app.listen(PORT, () => {
    console.log(`Servidor corriendo en el puerto: ${PORT}`);
})