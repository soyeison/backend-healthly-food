const { response } = require("express");
const bcryptjs = require("bcryptjs");

const Usuario = require("../models/usuario");

const usuariosGet = async (req, res) => {
  const { limite = 5, desde = 0 } = req.query;
  const query = { estado: true };

  const [total, usuario] = await Promise.all([
    Usuario.countDocuments(query),
    Usuario.find(query).skip(Number(desde)).limit(Number(limite)),
  ]);
  res.json({
    total,
    usuario,
  });
};

const usuariosPost = async (req, res = response) => {
  const { nombre, correo, contraseña } = req.body;
  const usuario = new Usuario({ nombre, correo, contraseña });

  //Encriptar la contraseña
  const salt = bcryptjs.genSaltSync();
  usuario.contraseña = bcryptjs.hashSync(contraseña, salt);

  await usuario.save();
  res.json(usuario);
};

const usuariosPut = async (req, res) => {
  const { id } = req.params;
  const { _id, password, google, correo, ...resto } = req.body;

  //Validar contra base de datos

  if (password) {
    const salt = bcryptjs.genSaltSync();
    resto.password = bcryptjs.hashSync(password, salt);
  }

  const usuario = await Usuario.findByIdAndUpdate(id, resto, { new: true });

  res.json(usuario);
};

module.exports = {
  usuariosGet,
  usuariosPost,
  usuariosPut,
};
