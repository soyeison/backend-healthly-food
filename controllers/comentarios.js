const { response } = require("express");

const Comentario = require("../models/comentario");

const comentariosGet = async (req, res = response) => {
  const { limite = 5, desde = 0 } = req.query;
  const query = { estado: true };

  const [total, comentarios] = await Promise.all([
    Comentario.countDocuments(query),
    Comentario.find(query)
      .populate("usuario", "nombre")
      .skip(Number(desde))
      .limit(Number(limite)),
  ]);

  res.json({
    total,
    comentarios,
  });
};

const comentariosPost = async (req, res = response) => {
  const { usuario, estado, ...body } = req.body;

  const data = {
    ...body,
    usuario: req.usuario._id,
  };

  const comentario = new Comentario(data);

  //Guardar en DB

  await comentario.save();

  res.status(201).json(comentario);
};

module.exports = {
  comentariosGet,
  comentariosPost,
};
