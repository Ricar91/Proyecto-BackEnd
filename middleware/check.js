const {check} = require('express-validator');

const check = [
    check("tipo").not().isEmpty().withMessage("El campo esta vacio"),
    check("marca").not().isEmpty().withMessage("El campo esta vacio"),
    check("modelo").not().isEmpty().withMessage("El campo esta vacio"),
    check("color").not().isEmpty().withMessage("El campo esta vacio"),
    check("precio").not().isEmpty().withMessage("El campo esta vacio"),
    check("condicion").not().isEmpty().withMessage("El campo esta vacio"),
]
