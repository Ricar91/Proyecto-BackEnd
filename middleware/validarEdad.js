const {User} = require ("../models/users");
const validarEdad = async (req, res, next) => {
    const value = await User.findOne(req.params.body)
    if (value < 18 || value > 40) {
        next();
    } else {
        res.json({msg:"Rango de edad debe ser entre 18 y 40"})
    }
}

module.exports = {validarEdad}
