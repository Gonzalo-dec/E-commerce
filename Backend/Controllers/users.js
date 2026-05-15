const db = require('../db');

const getAllUsers = async (req, res) => {
    try{
    const [ rows ] = await db.query('SELECT * FROM users');
    res.status(200).json({ message:'Usuarios obtenidos exitosamente', data: rows});
    }catch(err){
        console.error(err);
        res.status(500).json({message: 'Error interno del servidor', error: err.message})
    }
}

const createUser = async (req, res) => {
    try{
        const { name, email, password } = req.body;

        if(!name || !email || !password) {
            res.status(400).json({message: 'Faltan campos obligatorios'})
        }
        const [ rows ] = await db.query('INSERT INTO users (name, email, password) VALUES (?,?,?)', [name, email, password]);
        res.status(201).json({ message: 'Usuario creado con éxito', data: rows});
    }catch(err){
        console.error(err);
        res.status(500).json({message: 'Error interno del servidor', error: err.message});
    }
}

const updateUser = async (req, res) => {
    try{
        const id = req.params.id;
        const { name, password } = req.body;
        if(!name || !password){
            res.status(400).json({message:'Faltan completar los campos a actualizar'})
        }
        const [ rows ] = await db.query('UPDATE users SET name = ?, password = ? WHERE id = ?', [name, password, id]);
        res.status(200).json({ message: 'Usuario actualizado con éxito', data: rows});
    }catch(err){
        console.error(err);
        res.status(500).json({message:'Error interno del servidor', error: err.message});
    }
}

const deleteUser = async (req, res) => {
    try{
        const id = req.params.id;
        const [ rows ] = await db.query('DELETE FROM users WHERE id = ?', [id]);
        res.status(200).json({ message: 'Usuario eliminado con éxito', data: rows});
    }catch(err) {
    console.error(err);
    res.status(500).json({ message: 'Error interno del servidor', error: err.message });
}
}

module.exports = { getAllUsers, createUser, updateUser, deleteUser };