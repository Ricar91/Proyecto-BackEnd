var express = require('express');
var router = express.Router();
const controllers = require("../controller/controller")
const { validarUserId } = require('../middleware/validarUserId');
const { validarEdad } = require('../middleware/validarEdad');
const { validarMail } = require('../middleware/validarMail');
const {check} = require('express-validator');
const auth = require('../middleware/auth');
const validarJWT = require('../middleware/validarToken');

/* GET users listing. */
router.post('/crearuser', [
    check("nombre").exists().not().isEmpty().withMessage("El campo esta vacio"),
    check("apellido").exists().not().isEmpty().withMessage("El campo esta vacio"),
    check("edad").exists().not().isEmpty().withMessage("El campo esta vacio"),
    check("email").exists().not().isEmpty().withMessage("El campo esta vacio").isEmail(),
    check("contraseña").exists().not().isEmpty().withMessage("El campo esta vacio"),
], controllers.crearUser);
router.get('/veruser', controllers.verUsers);
router.get('/veruser/:id', validarUserId, validarEdad, controllers.verUnUser);
router.put('/editaruser/:id',validarUserId, validarMail, controllers.editarUser);
router.delete("/eliminaruser/:id", validarUserId, controllers.eliminarUser)
router.get('/pokemon/:name', controllers.consultaAxios);
router.get('/sesion', controllers.session);
router.get('/pruebasesion', auth, controllers.pruebaSession);
router.get('/consultacookie', controllers.consultarCookie);
router.get('/eliminarcookie', controllers.eliminarCookie);
router.get('/cerrarsesion', controllers.cerrarSession);
router.get('/user', validarJWT, controllers.user);
router.get('/login', controllers.login);

router.post('/loginUsuario',[
    check("email").exists().not().isEmpty().withMessage("El campo esta vacio").isEmail().withMessage("Lo ingresado no es un e-mail"),
    check("contraseña").exists().not().isEmpty().withMessage("El campo esta vacio"),
], controllers.loginUsuarios);

module.exports = router;