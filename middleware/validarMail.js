const {User} = require ("../models/users");

const validarMail = async (req, res, next) => {
    const user = await User.findUserByEmail(req.params.id)
    if (user) {
        next();
    } else {
        res.json({msg:'El e-mail ya esta en uso'})
    }
}

module.exports = {validarMail}