const db = require('../db');

const getAllCategories = async (req, res) => {
    try{
        const [ rows ] = await db.query('SELECT * FROM categories');
        res.status(200).json({ message: 'Categorias obtenidas con exito', data: rows});
    }catch(err){
        res.status(500).json({ message: `Error al obtener categorias ${err}` })
    }
}

const getProductsByCategoryId= async (req, res) => {
    try{
        const category_id = req.params.id;
        const [ rows ] = await db.query(`
    SELECT p.id, p.category_id, p.name, p.price, p.description, p.stock, c.name AS category_name
    FROM products AS p
    JOIN categories AS c ON p.category_id = c.id
    WHERE c.id = ?
`, [category_id]);
        res.status(200).json({ message: 'Productos por id obtenidos con exito', data: rows});
    }catch(err){
    console.error('Error:', err);
    res.status(500).json({ message: `Error al obtener la categoria ${err}` })
}
}


module.exports = { getAllCategories, getProductsByCategoryId };