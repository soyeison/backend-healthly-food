const { response } = require("express");
const bcryptjs = require("bcryptjs");

const Usuario = require("../models/usuario");

const { generarJWT } = require("../helpers/generar-jwt");

const login = async (req, res = response) => {
  const { correo, contraseña } = req.body;
  try {
    //Verificar si el usuario existe
    const usuario = await Usuario.findOne({ correo });
    if (!usuario) {
      return res.status(400).json({
        msg: "Usuario / Password no son correctos - Correo",
      });
    }

    //Verificar si el usuario está activo
    if (!usuario.estado) {
      return res.status(400).json({
        msg: "Usuario / Password no son correctos - estado: false",
      });
    }

    //Verificar la contraseña
    const validContraseña = bcryptjs.compareSync(
      contraseña,
      usuario.contraseña
    );
    if (!validContraseña) {
      return res.status(400).json({
        msg: "Usuario / Password no son correctos - Contraseña",
      });
    }

    //Generar el token de la sesión
    const token = await generarJWT(usuario.id);

    res.json({
      usuario,
      token,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      msg: "Hable con el administrador",
    });
  }
};

module.exports = {
  login,
};
