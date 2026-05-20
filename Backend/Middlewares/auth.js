const jwt = require('jsonwebtoken')

function autorizar(req, res, next){
    const token = req.headers.authorization;
    if(!token){
       return res.status(401).json({ message: 'No se encontro al usuario'});
    }
    try{
    const verificado = jwt.verify(token, process.env.JWT_SECRET)
    next();
    }catch(err){
        return res.status(403).json({ message: 'Token invalido o expirado'})
    }
}

module.exports = autorizar;