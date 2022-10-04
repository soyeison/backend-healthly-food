const { Schema, model } = require("mongoose");

const PublicacionSchema = Schema({
  usuario: {
    type: Schema.Types.ObjectId,
    ref: "Usuario",
    require: true,
  },
  descripcion: {
    type: String,
    require: [true, "La descripción es obligatoria"],
  },
  img: {
    type: String,
    default: "Aqui va una imagen por defecto",
  },
  estado: {
    type: Boolean,
    default: true,
    require: true,
  },
});

PublicacionSchema.methods.toJSON = function () {
  const { __v, ...data } = this.toObject();
  return data;
};

module.exports = model("Publicacion", PublicacionSchema);
