var express = require('express');
var router = express.Router();
const controllers = require("../controller/controller")
const {check} = require('express-validator');
const { validarId } = require('../middleware/validarId');

/* GET users listing. */
router.post('/crear', [
    check("tipo").not().isEmpty().withMessage("El campo esta vacio").isLength({max:15, min:4}).withMessage("Debe tener mas de 4 letras pero menos de 15 caracteres"),
    check("marca").not().isEmpty().withMessage("El campo esta vacio"),
    check("modelo").not().isEmpty().withMessage("El campo esta vacio"),
    check("color").not().isEmpty().withMessage("El campo esta vacio"),
    check("precio").not().isEmpty().withMessage("El campo esta vacio"),
], controllers.crearItem);
router.get('/ver', controllers.verItems);
router.get('/ver/:id', validarId, controllers.verUnItem);

module.exports = router;
