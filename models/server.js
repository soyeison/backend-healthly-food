const express = require("express");
const cors = require("cors");
const { dbConnection } = require("../database/config");
const { use } = require("../routes/auth");

class Server {
  constructor() {
    this.app = express();
    this.port = process.env.PORT;

    this.paths = {
      auth: "/api/auth",
      comentarios: "/api/comentarios",
      usuarios: "/api/usuarios",
      publicaciones: "/api/publicaciones",
    };

    //Conexion a DB
    this.conectarDB();

    //middlewares
    this.middlewares();

    //routes
    this.routes();
  }

  async conectarDB() {
    await dbConnection();
  }

  middlewares() {
    //cors
    this.app.use(cors());

    //parsear body a json
    this.app.use(express.json());
  }

  routes() {
    this.app.use(this.paths.auth, require("../routes/auth"));
    this.app.use(this.paths.comentarios, require("../routes/comentarios"));
    this.app.use(this.paths.usuarios, require("../routes/usuarios"));
    this.app.use(this.paths.publicaciones, require("../routes/publicaciones"));
  }

  listen() {
    this.app.listen(this.port, () => {
      console.log(`servidor corriendo en puerto: ${this.port}`);
    });
  }
}

module.exports = Server;
