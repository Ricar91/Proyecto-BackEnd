const {check} = require('express-validator');

const check = [
    check("tipo").exists().not().isEmpty().withMessage("El campo esta vacio"),
    check("marca").exists().not().isEmpty().withMessage("El campo esta vacio"),
    check("modelo").exists().not().isEmpty().withMessage("El campo esta vacio"),
    check("color").exists().not().isEmpty().withMessage("El campo esta vacio"),
    check("precio").exists().not().isEmpty().withMessage("El campo esta vacio"),
    check("condicion").exists().not().isEmpty().withMessage("El campo esta vacio"),
    check("nombre").exists().not().isEmpty().withMessage("El campo esta vacio"),
    check("apellido").exists().not().isEmpty().withMessage("El campo esta vacio"),
    check("edad").exists().not().isEmpty().withMessage("El campo esta vacio"),
    check("email").exists().not().isEmpty().withMessage("El campo esta vacio").isEmail(),
]
