const {User} = require ("../models/users");

const validarMail = async (req, res, next) => {
    const user = await User.findOne({email: req.body.email})
    if (user == null) {
        next();
    } else {
        res.json({msg:'El e-mail ya esta en uso'})
    }
}

module.exports = {validarMail}