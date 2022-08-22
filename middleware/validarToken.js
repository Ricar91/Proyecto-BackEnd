const jwt = require('jsonwebtoken');
const {User} = require('../models/users');
require('dotenv').config();

module.exports = validarJWT = (req, res, next) => {
    const token = req.header('x-token');
    console.log(token)

    if(!token) {
        res.status(401).json({
            msg:'No hay token en la petición'
        });
    }

    const verify = jwt.verify(token, process.env.SECRET_TOKEN);
    const result = User.findById(verify.body.id)

    if(!result) {
        res.status(401).json({
            msg:'Este token no es mio'
        });
    }
    next();
}