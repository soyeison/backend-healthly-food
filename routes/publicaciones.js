const { Router } = require("express");
const { check } = require("express-validator");

const {
  publicacionesGet,
  publicacionGet,
  publicacionesPost,
  publicacionesPut,
  publicacionesDel,
} = require("../controllers/publicaciones");

const { existePublicacionPorId } = require("../helpers/db-validator");

const { validarCampos } = require("../middlewares/validar-campos");
const { validarJWT } = require("../middlewares/validar-jwt");

const router = Router();

router.get("/", publicacionesGet);

router.get(
  "/:id",
  [
    check("id", "No es un id válido").isMongoId(),
    check("id").custom(existePublicacionPorId),
    validarCampos,
  ],
  publicacionGet
);

router.post(
  "/",
  [
    validarJWT,
    check("descripcion", "La descripcion es obligatoria").not().isEmpty(),
    validarCampos,
  ],
  publicacionesPost
);

router.put(
  "/:id",
  [
    validarJWT,
    check("id", "No es un id válido").isMongoId(),
    check("id").custom(existePublicacionPorId),
    check("descripcion", "La descripcion es obligatoria").not().isEmpty(),
    validarCampos,
  ],
  publicacionesPut
);

router.delete(
  "/:id",
  [
    validarJWT,
    check("id", "No es un id válido").isMongoId(),
    check("id").custom(existePublicacionPorId),
    validarCampos,
  ],
  publicacionesDel
);

module.exports = router;
