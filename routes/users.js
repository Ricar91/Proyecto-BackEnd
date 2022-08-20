var express = require('express');
var router = express.Router();
const controllers = require("../controller/controller")
const { validarUserId } = require('../middleware/validarUserId');
const { validarEdad } = require('../middleware/validarEdad');

/* GET users listing. */
router.post('/crearuser', controllers.crearUser);
router.get('/veruser', controllers.verUsers);
router.get('/veruser/:id', validarEdad, validarUserId, controllers.verUnUser);
router.put('/editaruser/:id',validarUserId, controllers.editarUser);
router.delete("/eliminaruser/:id", validarUserId, controllers.eliminarUser)
router.get('/hash', controllers.contrUser);
router.get('/pokemon/:name', controllers.consultaAxios);

module.exports = router;