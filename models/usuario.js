const { Schema, model } = require("mongoose");

const UsuarioSchema = Schema({
  nombre: {
    type: String,
    require: [true, "El nombre es obligatorio"],
  },
  correo: {
    type: String,
    require: [true, "El correo es obligatorio"],
    unique: true,
  },
  contraseña: {
    type: String,
    require: [true, "La contraseña es obligatoria"],
  },
  img: {
    type: String,
  },
  estado: {
    type: Boolean,
    default: true,
  },
  google: {
    typeof: Boolean,
    default: false,
  },
});

UsuarioSchema.methods.toJSON = function () {
  const { __v, _id, contraseña, ...usuario } = this.toObject();
  usuario.uid = _id;
  return usuario;
};

module.exports = model("Usuario", UsuarioSchema);
