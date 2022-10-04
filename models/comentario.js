const { Schema, model } = require("mongoose");

const ComentarioSchema = Schema({
  comentario: {
    type: String,
    require: true,
  },
  usuario: {
    type: Schema.Types.ObjectId,
    ref: "Usuario",
    require: true,
  },
  publicacion: {
    type: Schema.Types.ObjectId,
    ref: "Publicacion",
    require: true,
  },
  estado: {
    type: Boolean,
    default: true,
    require: true,
  },
});

ComentarioSchema.methods.toJSON = function () {
  const { __v, estado, ...data } = this.toObject();
  return data;
};

module.exports = model("Comentario", ComentarioSchema);
