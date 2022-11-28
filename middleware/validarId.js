const { Item } = require("../models/instrumentos");
const validarId = async (req, res, next) => {
  try {
    const item = await Item.findById(req.params.id);
    if (item !== null) {
      next();
    } else {
      res.json({ msg: "El id es invalido" });
    }
  } catch (error) {
    res.json({ msg: "El formato de id ingresado es inválido", error });
  }
};
module.exports = { validarId };
