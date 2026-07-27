const db = require('../db');

/*const getAllOrders = async (req, res) => {
    try{
    const [ rows ] = await db.query(`
        SELECT o.id, o.total, o.created_at, p.name AS product_name, oi.quantity, u.name AS user_name
        FROM orders AS o
        JOIN order_items AS oi ON o.id = oi.order_id
        JOIN users AS u ON u.id = o.user_id
        JOIN products AS p ON p.id = oi.product_id
        `);
    res.status(200).json({ message: 'Ordenes obtenidas con éxito', data: rows});
    }catch(err){
        console.error(`Error al obtener ordenes ${err}`);
    }
}
*/

const getOrdersById = async (req, res) => {
    try{
    const userId = req.user.id;
    const [ orders ] = await db.query('SELECT * FROM orders WHERE user_id = ? ORDER BY created_at DESC', [userId]);
    const [ itemsOrder ] = await db.query(`SELECT p.name, oi.unit_price, oi.quantity, oi.order_id
        FROM order_items AS oi
        JOIN products AS p ON oi.product_id = p.id
        JOIN orders AS o ON oi.order_id = o.id WHERE o.user_id = ?;
        `, [userId]);
        const ordersWithItems = orders.map(order => ({
            ...order,
            items: itemsOrder.filter(item => item.order_id == order.id)
        })
        )
        res.status(200).json({ message: 'Ordenes obtenidas con éxito', data: ordersWithItems });
    }catch(err){
        console.error(`Error al obtener ordenes ${err}`);
        res.status(500).json({ message: 'Error interno del servidor'})
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

const checkout = async (req, res) => {
        const connection = await db.getConnection();
    try{
        await connection.beginTransaction();
        const userId = req.user.id;
        const { items } = req.body;
        let total = 0;
        const itemsValidados = [];
        for (const item of items) {
            const [ rows ] = await connection.query('SELECT price, stock FROM products WHERE id = ?', [item.id])
            if(item.cantidad > rows[0].stock){
                throw new Error("No hay stock suficiente");
                
            }
            total += rows[0].price * item.cantidad;
            itemsValidados.push({ product_id: item.id, quantity: item.cantidad, unit_price: rows[0].price})
        }
        const [ result ] = await connection.query('INSERT INTO orders (user_id, total) VALUES(?, ?)', [userId, total])
        
        for(const item of itemsValidados){
            await connection.query('INSERT INTO order_items (product_id, quantity, unit_price, order_id) VALUES(?, ?, ?, ?)', [item.product_id, item.quantity, item.unit_price, result.insertId]);
            await connection.query('UPDATE products SET stock = stock - ? WHERE id = ?', [item.quantity, item.product_id]);
        }
        await connection.commit();
        res.status(201).json({ message: 'Compra realizada con éxito', data: result.insertId})
    }catch(err){
       await connection.rollback();
       console.error(err);
       if(err.message === "No hay stock suficiente"){
       return res.status(400).json({ message: err.message});
       }
    res.status(500).json({ message: 'Error interno del servidor'});
    } finally{
        connection.release();
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

module.exports = {  getOrdersById, checkout, deleteOrder };