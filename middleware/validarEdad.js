const {User} = require ("../models/users");

const validarEdad = async (req, res, next) => {
    const value = await User.findOne({edad: req.body.edad})
    if (value > 18) {
        next();
    } else {
        res.json({msg:"Debe ser mayor de 18 años"})
    }
}

module.exports = {validarEdad}
