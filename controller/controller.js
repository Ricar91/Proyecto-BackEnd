const {Item} = require("../models/instrumentos")

const controllers = {
    myIndex(req,res) {
        res.render('index', { title: 'Express' });
    },
    myUser(req,res) {
        res.json({
            name:"Ricardo",
            age:31
        })
    },
    newItem: async (req, res) => {
            try {
                const item = new Item(req.body);
                await item.save()
                res.status(201).json(item)
            } catch (err) {
                res.status(501).json({msg: "No se puede guardar el item por favor intenta más tarde", err})
            }
        }
}

module.exports = controllers