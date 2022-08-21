const {Item} = require("../models/instrumentos")
const {User} = require("../models/users")
const {validationResult} = require('express-validator')
const bcrypt = require('bcryptjs');
const axios = require('axios');

const controllers = {
    myIndex(req,res) {
        res.render('index', { title: 'Proyecto BackEnd' });
    },

//------------- Users ---------------

crearUser: async (req, res) => {
    try {
        const error = validationResult(req)
        if (error.isEmpty()){

            const user = new User(req.body);
            await user.save()
            res.status(201).json({user})
        } else {
            res.status(501).json(error)
        }    
    } catch (err) {
        res.status(501).json({msg: "No se pudo guardar el usuario por favor intenta más tarde", err})
    }
},

verUsers: async (req, res) => {
const users = await User.find();
res.json({ users })
},


verUnUser: async (req, res) => {
try {
const user = await User.findById(req.params.id)
res.json({user})
} catch (error) {
res.status(400).json({msg:'error con el id', error})
}
},

editarUser: async (req, res) => {
try {
    const error = validationResult(req);
    if (error.isEmpty()) {
        const {id} = req.params

    const actualizar = await User.findByIdAndUpdate(id, req.body)
    res.status(202).json({actualizar, msg:"se actualizó el usuario"})
    } else {
    res.status(501).json(error)
    }    
} catch (error) {
    res.status(501).json({msg: "Este usuario ya existe en la base de datos", err})
}
},

eliminarUser: async (req, res) => {
try {
    const user = await User.findByIdAndDelete(req.params.id)
    res.json({msg:"Eliminado", user})
} catch (error) {
    res.status(400).json({msg:'Problemas a la hora de borrar la información'})
}
},

contrUser: (req, res) => {
    let contraseña = "123456798";
    let salt = bcrypt.genSaltSync(10);
    let hash = bcrypt.hashSync(contraseña, salt);
    let comparacion1 = bcrypt.compareSync('123456789', hash);
    let comparacion2 = bcrypt.compareSync('sarasa', hash);
    res.json({
        contr: contraseña,
        contr1: hash,
        comparacion: comparacion1,
        otraComparacion: comparacion2
    });
},

//--------- Instrumentos --------------

    crearItem: async (req, res) => {
            try {
                const error = validationResult(req)
                if (error.isEmpty()){

                    const item = new Item(req.body);
                    await item.save()
                    res.status(201).json({item})
                } else {
                    res.status(501).json(error)
                }    
            } catch (err) {
                res.status(501).json({msg: "No se puede guardar el item por favor intenta más tarde", err})
            }
        },

    verItems: async (req, res) => {
        const items = await Item.find();
        res.json({ items })
    },


    verUnItem: async (req, res) => {
    try {
        const item = await Item.findById(req.params.id)
        res.json({item})
    } catch (error) {
        res.status(400).json({msg:'error con el id', error})
    }
    },

    editarItem: async (req, res) => {
        try {
            const error = validationResult(req);
            if (error.isEmpty()) {
                const {id} = req.params
    
            const update = await Item.findByIdAndUpdate(id, req.body)
            res.status(202).json({update, msg:"se actualizó el item"})
            } else {
            res.status(501).json(error)
            }    
        } catch (error) {
            res.status(501).json({msg: "Este item ya existe en la base de datos", err})
        }
    },

    eliminarItem: async (req, res) => {
        try {
            const item = await Item.findByIdAndDelete(req.params.id)
            res.json({msg:"Eliminado", item})
        } catch (error) {
            res.status(400).json({msg:'Problemas a la hora de borrar la información'})
        }
    },

//--------- Consulta Axios --------------

    consultaAxios: async (req, res) => {
    try {
        const respuesta = await axios.get("https://pokeapi.co/api/v2/pokemon/"+req.params.name, {timeout: 10000});
        res.json({status: respuesta.status, data: respuesta.data})
    } catch (error) {
        res.json({status: error.response.status, data: error.response.data})
    }
},


//--------- Sesion --------------

session: (req, res) => {
    let usuario = {
        email: "jorge654@gmail.com",
        user: "jorge",
        edad: "30",
        idioma: "español",
    }
    res.cookie('sessionDelUsuario', usuario.idioma, {maxAge:60000}),
    req.session.usuario = usuario,
    res.json(req.session.usuario)
},

pruebaSession: (req, res) => {
    console.log(req.session)
    res.json(req.session.usuario)
},

cerrarSession: (req, res) => {
    req.session.destroy();
    res.json({msg: "sesión cerrada"})
},

//--------- Cookies --------------

consultarCookie: (req, res) => {
    res.json(req.cookies.sessionDelUsuario)
},

eliminarCookie: (req, res) => {
    res.clearCookie('sessionDelUsuario')
    res.json({msg: "se eliminó cookie"})
},


//--------- Login --------------

loginUsuarios: async (req, res) => {
    const persona = await User.findOne({email: req.body.email})
    if (!persona) {
        res.json({msg: "E-mail incorrecto"})
    }
    if (!bcrypt.compareSync(req.body.contraseña, persona.contraseña)) {
        res.json({msg: "Contraseña incorrecta"})
    }

    const usuario = {
        _id: persona._id,
        name: persona.name,
        idioma: persona.idioma,
        role: persona.permiso || "USER"
    }
    req.session.user = usuario

    // Checkbox

    if (req.body.recordar) {
        res.cookie('sessionDelUsuario', req.session.user, {maxAge:60000*60*24*125})
    }
    res.status(201).json({msg: "Usuario logueado"})
},

    // Delete

logout: (req, res) => {
    req.clearCookie('sessionDelUsuario'),
    req.session.destroy(),
    res.json({msg: "Sesión cerrada"})
   }, 

}

module.exports = controllers
