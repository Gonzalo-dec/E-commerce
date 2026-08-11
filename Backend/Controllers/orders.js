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
    const [ itemsOrder ] = await db.query(`SELECT p.name, p.image_url, oi.unit_price, oi.quantity, oi.order_id
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
const getSalesBySeller = async (req, res) => {
    try{
        const sellerId = req.user.id;
        const [ orders ] = await db.query('SELECT * FROM orders WHERE seller_id = ? ORDER BY created_at DESC', [sellerId]);
        const [ itemsOrder] = await db.query(`SELECT p.name AS product_name, p.image_url, oi.unit_price, oi.quantity, oi.order_id, u.name AS buyer_name, o.total
            FROM order_items AS oi
            JOIN products AS p ON oi.product_id = p.id
            JOIN orders AS o ON oi.order_id = o.id
            JOIN users AS u ON o.user_id = u.id WHERE o.seller_id = ?
            `, [ sellerId]);
            const ordersWithItems = orders.map(order => ({
            ...order,
            items: itemsOrder.filter(item => item.order_id == order.id)
        })
        )
        res.status(200).json({ message: 'Ventas obtenidas con éxito', data: ordersWithItems});
    }catch(err){
        console.error(`Error al obtener las ventas, error: ${err}`);
        res.status(500).json({message: 'Error interno del servidor'});
    }
}

const checkout = async (req, res) => {
    let connection;
    try{
        connection = await db.getConnection();
        await connection.beginTransaction();
        const userId = req.user.id;
        const { items } = req.body;
        const itemsValidados = [];
        for (const item of items) {
            const [ rows ] = await connection.query('SELECT price, stock, user_id FROM products WHERE id = ?', [item.id])
            if(rows.length == 0){
                throw new Error('Producto sin existencias');
            }

            if(item.cantidad > rows[0].stock){
                throw new Error("No hay stock suficiente");
                
            }
            itemsValidados.push({ product_id: item.id, quantity: item.cantidad, unit_price: rows[0].price, seller_id: rows[0].user_id})
        }
        const itemsBySeller = {};
        for(const items of itemsValidados){
                if(!itemsBySeller[items.seller_id]){
                    itemsBySeller[items.seller_id] = [];
                }
                
                itemsBySeller[items.seller_id].push(items);
            }
        const idSellers = [];
        for(const [seller_id, items] of Object.entries(itemsBySeller)){
            const total = items.reduce((acumulador, numeroActual) => {
                return acumulador + numeroActual.quantity * numeroActual.unit_price;
            }, 0);
            const [ result ] = await connection.query('INSERT INTO orders (user_id, seller_id, total) VALUES (?,?,?)', [userId, Number(seller_id), total]);
            for(const item of items){
            await connection.query('INSERT INTO order_items (product_id, quantity, unit_price, order_id) VALUES(?, ?, ?, ?)', [item.product_id, item.quantity, item.unit_price, result.insertId]);
            await connection.query('UPDATE products SET stock = stock - ? WHERE id = ?', [item.quantity, item.product_id]);
        }
        idSellers.push({ order_id: result.insertId});
    }
        await connection.commit();
        res.status(201).json({ message: 'Compra realizada con éxito', data: idSellers});
    }catch(err){
       await connection.rollback();
       console.error(err);
       if(err.message === "No hay stock suficiente"){
       return res.status(400).json({ message: err.message});
       } else if(err.message === 'Producto sin existencias'){
        return res.status(404).json({ message: err.message});
       }
    res.status(500).json({ message: 'Error interno del servidor'});
    } finally{
        connection.release();
    }
}

const deleteOrder = async (req, res) => {
    try{
        const id = req.params.id;
        const userId = req.user.id;
        const [ rows ] = await db.query('DELETE FROM orders WHERE id = ? AND user_id = ?', [ id, userId ]);
        if(rows.affectedRows == 0){
           return res.status(404).json({ message: 'No tienes permisos para eliminar esta orden o la orden no existe'});
        }
        res.status(200).json({ message: 'Orden eliminada con éxito', data: rows});
    }catch(err) {
        res.status(500).json({ message: 'Error interno del servidor'});
    }
}

module.exports = {  getOrdersById, getSalesBySeller, checkout, deleteOrder };