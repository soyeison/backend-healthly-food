const { Router } = require("express");
const { check } = require("express-validator");

const {
  usuariosPost,
  usuariosGet,
  usuariosPut,
} = require("../controllers/usuarios");

const { emailExiste, existeUsuarioPorId } = require("../helpers/db-validator");

const { validarCampos } = require("../middlewares/validar-campos");
const { validarJWT } = require("../middlewares/validar-jwt");

const router = Router();

router.get("/", usuariosGet);

router.post(
  "/",
  [
    check("nombre", "El nombre es obligatorio").not().isEmpty(),
    check("correo", "El correo no es válido").isEmail(),
    check(
      "contraseña",
      "La contraseña debe de contener más de 6 caracteres"
    ).isLength({
      min: 6,
    }),
    check("correo").custom(emailExiste),
    validarCampos,
  ],
  usuariosPost
);

router.put(
  "/:id",
  [
    validarJWT,
    check("id", "No es un id válido").isMongoId(),
    check("id").custom(existeUsuarioPorId),
    validarCampos,
  ],
  usuariosPut
);

module.exports = router;
