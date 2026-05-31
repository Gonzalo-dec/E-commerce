const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const db = require('../db')

async function register(req, res){
try{
    const { name, email, password } = req.body;
    const [ emailDb ] = await db.query('SELECT * FROM users WHERE email = ?', [email])
    if(!name || !email || !password){
       return res.status(400).json({ message: 'Debes completar los campos obligatorios'})
    } else if (emailDb.length > 0) {
       return  res.status(409).json({ messge:'Email ya registrado'})
    }
    const passwordHash = await bcrypt.hash(password, 8);
    const [ rows ] = await db.query('INSERT INTO users (name, email, password) VALUES(?,?,?)', [name, email, passwordHash]);
    res.status(201).json({ message: 'Usuario creado con éxito', data: rows})
    }catch(err){
        res.status(500).json({ message: 'Error interno del servidor', error: err.message});
    } 
}

async function login(req, res) {
    try {
    const { email, password } = req.body;
    if(!email || !password){
        return res.status(400).json({ message: 'Debes completar los campos obligatorios'})
    }
    const [ rows ] = await db.query('SELECT * FROM users WHERE email = ?', [email]);
    if(rows.length === 0){
        return res.status(404).json({ message: 'Usuario no encontrado'})
    }
    const esValida = await bcrypt.compare(password, rows[0].password);
    if(esValida) {
    const token = jwt.sign({ id: rows[0].id}, process.env.JWT_SECRET)
    return res.status(200).json({ message: 'Inicio de sesión exitoso', token, name: rows[0].name})
    }else{
        return res.status(401).json({ message: 'Credenciales incorrectas'})
    }
    }catch(err){
        res.status(500).json({ message: 'Error interno del servidor', error: err.message});
    }
}

module.exports = { register, login };
