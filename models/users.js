const mongoose = require("mongoose");

const Schema = mongoose.Schema;
const storeSchema = new Schema({
  nombre: {
    type: String,
    required: true,
  },
  apellido: {
    type: String,
    required: true,
  },
  edad: {
    type: Number,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  contraseña: {
    type: String,
    required: true,
    unique: true,
  },
});

const User = mongoose.model("User", storeSchema);
module.exports = { User };
