const { response } = require("express");

const Publicacion = require("../models/publicacion");

const publicacionesGet = async (req, res = response) => {
  const { limite = 5, desde = 0 } = req.query;
  const query = { estado: true };

  const [total, publicaciones] = await Promise.all([
    Publicacion.countDocuments(query),
    Publicacion.find(query)
      .populate("usuario", "nombre")
      .skip(Number(desde))
      .limit(Number(limite)),
  ]);

  res.json({
    total,
    publicaciones,
  });
};

const publicacionGet = async (req, res = response) => {
  const { id } = req.params;

  const publicacion = await Publicacion.findById(id).populate(
    "usuario",
    "nombre"
  );

  res.json({
    publicacion,
  });
};

const publicacionesPost = async (req, res = response) => {
  const { descripcion } = req.body;

  const data = {
    descripcion,
    usuario: req.usuario._id,
  };

  const publicacion = new Publicacion(data);

  await publicacion.save();
  res.status(201).json(publicacion);
};

const publicacionesPut = async (req, res = response) => {
  const { id } = req.params;
  const { estado, usuario, ...data } = req.body;

  data.usuario = req.usuario._id;

  if (!data.descripcion) {
    return res.json({
      msg: "Debe ingresar na descripción",
    });
  }

  const publicacion = await Publicacion.findByIdAndUpdate(id, data, {
    new: true,
  });

  res.json({
    publicacion,
  });
};

const publicacionesDel = async (req, res = response) => {
  const { id } = req.params;

  const publicacion = await Publicacion.findByIdAndUpdate(
    id,
    { estado: false },
    { new: true }
  );

  res.json({
    publicacion,
  });
};

module.exports = {
  publicacionesGet,
  publicacionGet,
  publicacionesPost,
  publicacionesPut,
  publicacionesDel,
};
