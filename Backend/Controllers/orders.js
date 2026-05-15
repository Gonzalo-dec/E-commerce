const db = require('../db');

const getAllOrders = async (req, res) => {
    try{
    const [ rows ] = await db.query(`
        SELECT o.id, p.name AS product_name, o.quantity, o.total, u.name AS user_name, o.created_at
        FROM orders AS o
        JOIN users AS u ON u.id = o.user_id
        JOIN products AS p ON p.id = o.product_id
        `);
    res.status(200).json({ message: 'Ordenes obtenidas con éxito', data: rows});
    }catch(err){
        console.error(`Error al obtener ordenes ${err}`);
    }
}

const createOrder = async (req, res) => {
    try{
        const { user_id, product_id, quantity, total } = req.body;
        if(!user_id || !product_id || !quantity || !total){
            res.status(400).json({message: 'Debes ingresar los campos obligatorios'})
        }
        const [ rows ] = await db.query('INSERT INTO orders (user_id, product_id, quantity, total) VALUES (?,?,?,?)', [user_id, product_id, quantity, total]);
        res.status(201).json({ message: 'Transacción exitosa', data: rows});
    }catch(err){
        console.error(err);
        res.status(500).json({message: 'Error interno del servidor', error: err.message});
    }
}

const deleteOrder = async (req, res) => {
    try{
        const id = req.params.id;
        const [ rows ] = await db.query('DELETE FROM orders WHERE id = ?', [ id ]);
        res.status(200).json({ message: 'Orden eliminada con éxito', data: rows});
    }catch(err) {
        console.error(`Error al eliminar la orden ${err}`)
    }
}

module.exports = { getAllOrders, createOrder, deleteOrder };