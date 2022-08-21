var express = require('express');
var router = express.Router();
const controllers = require("../controller/controller")
const { validarId } = require('../middleware/validarId');
const {check} = require('express-validator');

/* GET users listing. */
router.post('/crear', [
    check("tipo").exists().not().isEmpty().withMessage("El campo esta vacio"),
    check("marca").exists().not().isEmpty().withMessage("El campo esta vacio"),
    check("modelo").exists().not().isEmpty().withMessage("El campo esta vacio"),
    check("color").exists().not().isEmpty().withMessage("El campo esta vacio"),
    check("precio").exists().not().isEmpty().withMessage("El campo esta vacio"),
    check("condicion").exists().not().isEmpty().withMessage("El campo esta vacio"),
], controllers.crearItem);
router.get('/ver', controllers.verItems);
router.get('/ver/:id', validarId, controllers.verUnItem);
router.put('/editar/:id',validarId, controllers.editarItem);
router.delete("/eliminar/:id", validarId, controllers.eliminarItem)

module.exports = router;
