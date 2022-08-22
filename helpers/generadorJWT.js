const jwt = require('jsonwebtoken')
require('dotenv').config();

module.exports = generarJWT = ( body ) => {
    return new Promise((resolve, reject) => {

    const payload = { body };

    jwt.sign(payload, process.env.SECRET_TOKEN, {
        expiresIn: '4h'
    },(error, token) => {
        if (error) {
            console.log(error);
            reject('No se pudo generar token');
        } else {
            resolve(token);
        }
    });
});
};