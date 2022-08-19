var express = require('express');
var router = express.Router();
const controllers = require("../controller/controller")
const { validarId } = require('../middleware/validarId');

/* GET users listing. */
router.post('/crear', controllers.crearItem);
router.get('/ver', controllers.verItems);
router.get('/ver/:id', validarId, controllers.verUnItem);
router.put('/editar/:id',validarId, controllers.editarItem);
router.delete("/eliminar/:id", validarId, controllers.eliminarItem)

module.exports = router;
