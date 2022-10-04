const { Router, response } = require("express");
const { check } = require("express-validator");

const {
  comentariosGet,
  comentariosPost,
} = require("../controllers/comentarios");

const { existePublicacionPorId } = require("../helpers/db-validator");

const { validarCampos } = require("../middlewares/validar-campos");
const { validarJWT } = require("../middlewares/validar-jwt");

const router = Router();

router.get("/", comentariosGet);

router.post(
  "/",
  [
    validarJWT,
    check("comentario", "El comentario es obligatorio").not().isEmpty(),
    check("publicacion", "No es un id válido").isMongoId(),
    check("publicacion").custom(existePublicacionPorId),
    validarCampos,
  ],
  comentariosPost
);

module.exports = router;
