const express = require('express');
const db = require('../db');


const getAllProducts = async (req, res) => {
    try{
    const [ rows ] = await db.query('SELECT * FROM products');
    res.status(200).json({ message: 'Productos obtenidos con exito', data: rows});
    } catch(err) {
        res.status(500).json({ message: 'Error interno del servidor'});
    }
}

const getProductById = async (req, res) => {
    try{
        const id = req.params.id;
        const [ rows ] = await db.query('SELECT id, name, price, description, stock, image_url FROM products  WHERE id = ? ', [id])
        res.status(200).json({ message:'Producto obtenido con exito', data: rows});
    }catch(err){
        console.error(`Error al obtener el producto ${err}`)
    }
}

const createProduct = async (req, res) => {
    try{
    const { name, price, description, stock, category_id } = req.body;
    const urlImg = req.file ? `/uploads/${req.file.filename}` : null;
    if(!name || !price || !description || !stock || !category_id){
       return res.status(400).json({message: 'Debes completar los campos obligatorios'})
    }
    const [ rows ] = await db.query('INSERT INTO products (name, price, description, stock, category_id, user_id, image_url) VALUES(?,?,?,?,?,?,?)', [name, price, description, stock, category_id, req.user.id, urlImg]);
    res.status(201).json({ message: 'Creación exitosa del producto', data: rows});
    } catch(err){
        console.error(err);
        res.status(500).json({message: 'Error interno del servidor', error: err.message});
    }
}

const updateProduct = async (req, res) => {
    try{
    const id = req.params.id;
    const { price, description } = req.body;
    if(!price || !description){
       return res.status(400).json({message:'Debes ingresar los datos para actualizar'})
    }
    const [ rows ] = await db.query('UPDATE products SET price = ?, description = ? WHERE id = ?', [price, description, id]);
    res.status(200).json({ message: 'Producto actualizado con éxito', data: rows});
    }catch(err){
        console.error(err);
        res.status(500).json({message:'Error interno del servidor', error: err.message});
    }
}

const deleteProduct = async (req, res) => {
    try{
    const id = req.params.id;
    const [ rows ] = await db.query('DELETE FROM products WHERE id = ?', [id]);
    res.status(200).json({ message:'Producto eliminado con éxito', data: rows});
    }catch(err){
        console.error(`Error al eliminar el producto ${err}`);
    }
}

module.exports = { getAllProducts, getProductById, createProduct, updateProduct, deleteProduct};