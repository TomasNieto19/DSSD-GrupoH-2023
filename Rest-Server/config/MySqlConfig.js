import { createConnection } from "mysql";

const connection = createConnection({
  host: "localhost",
  user: "root",
  password: "root",
  database: "DSSDGrupoH2023",
});

// Funciones pertenecientes al punto 3 -> Correo Interno

export function sendMessage(message) {

  return new Promise((resolve, reject) => {

    const { idRemitente, idDestinatario, asunto, mensaje } = message;

    const query = `INSERT INTO messages (id_remitente, id_destinatario, asunto, mensaje)  
      VALUES (${idRemitente}, ${idDestinatario}, '${asunto}', '${mensaje}')`;

    connection.query(query, (error) => {
      if (error) {

        reject("NO SE PUDO ENVIAR EL MENSAJE!: " + error.message);

      } else {

        resolve("MENSAJE ENVIADO CORRECTAMENTE!");

      }
    });
  });
}

export function getMessages(idUser) {

  return new Promise((resolve, reject) => {

    const query = `SELECT * FROM messages WHERE id_destinatario = ${idUser}`;

    connection.query(query, (error, results) => {
      if (error) {

        reject("ERROR AL OBTENER LOS MENSAJES DEL USUARIO POR ID: " + error.message);

      } else {

        if (results.length == 0) reject("NO HAY MENSAJES PARA EL USUARIO CON ID: " + idUser);
        
        resolve(formatMessages(results));

      }
    });
  });
}

export async function updateMessage(idMensaje, respuesta) {

  const response = await getMessageById(idMensaje);

  return new Promise((resolve, reject) => {

    if (response[0].respuesta != null) reject("EL MENSAJE YA FUE RESPONDIDO!");

    const query = `UPDATE messages SET respuesta = '${respuesta}' WHERE id_mensaje = ${idMensaje}`;

    connection.query(query, (error) => {
      if (error) {

        reject("ERROR AL RESPONDER EL MENSAJE: " + error.message);

      } else {

        resolve("EL MENSAJE DE RESPONDIÓ CORRECTAMENTE!");

      }
    });
  });
}

// Funciones auxiliares

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

function formatMessages(messages) {
  return messages.map((message) => {
    return {
      idMensaje: message.id_mensaje,
      idRemitente: message.id_remitente,
      idDestinatario: message.id_destinatario,
      asunto: message.asunto,
      mensaje: message.mensaje,
      respuesta: message.respuesta,
    };
  });
}

function getMessageById(idMensaje){

  return new Promise((resolve, reject) => {

    const query = `SELECT * FROM messages WHERE id_mensaje = ${idMensaje}`;

    connection.query(query, (error, results) => {
      if (error) {

        reject("ERROR AL OBTENER EL MENSAJE POR ID POR ID: " + error.message);

      } else {

        if (results.length == 0) reject("NO HAY MENSAJE CON ID: " + idMensaje);
        
        resolve(formatMessages(results));

      }
    });
  });

}