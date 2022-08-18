const {Item} = require ("../models/instrumentos");
const validarId = async (req, res, next) => {
    const item = await Item.findById(req.params.id)
    if (item !== null) {
        next();
    } else {
        res.json({msg:"El id es invalido"})
    }
}

module.exports = {validarId}