const {User} = require ("../models/users");
const validarUserId = async (req, res, next) => {
    const user = await User.findById(req.params.id)
    if (user !== null) {
        next();
    } else {
        res.json({msg:"El id es invalido"})
    }
}

module.exports = {validarUserId}