import { createConnection } from "mysql";

const connection = createConnection({
  host: "localhost",
  user: "root",
  password: "root",
  database: "DSSDGrupoH2023",
});

export function testConexion() {
  connection.connect((err) => {
    if (err) {
      console.error("Error al conectar a la base de datos:", err);
    } else {
      console.log("\n\nConexión exitosa a la base de datos\n\n");
    }
  });

  connection.end();
}

export function getUsuarios() {
  connection.query("SELECT * FROM users", (err, rows) => {
    if (err) {
      console.error("Error al ejecutar la consulta:", err);
    } else {
      console.log("Resultados de la consulta:", rows);
    }
  });
  
  connection.end();
}

// PARA PROBAR ALGUN METODO, PEGAR ESTO EN EL INDEX.JS, DESCOMENTAR Y VER LA RESPUESTA EN LA CONSOLA.
/*
import { testConexion, getUsuarios } from "./config/MySqlConfig.js";
getUsuarios();
testConexion();
*/