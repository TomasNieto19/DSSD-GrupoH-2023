
import { getMessages } from "../config/MySqlConfig.js";

export async function leerMensajes(req, res) {

  // Trae los mensajes del destinatario de la base de datos.
  try {

    let response = await getMessages(req.params.idUser);

    res.status(200).json(response);

  } catch (error) {

    res.status(500).json({ mensaje: error });

  }
}