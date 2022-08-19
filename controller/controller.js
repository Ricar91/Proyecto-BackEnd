const {Item} = require("../models/instrumentos")
const {validationResult} = require('express-validator')

const controllers = {
    myIndex(req,res) {
        res.render('index', { title: 'Proyecto BackEnd' });
    },

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
}


module.exports = controllers
