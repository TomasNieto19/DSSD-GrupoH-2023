import { updateMessage } from "../config/MySqlConfig.js";

export async function responderMensaje(req, res) {

  const { idMensaje, respuesta } = req.body;

  // Trae los mensajes del destinatario de la base de datos.
  try {

    let response = await updateMessage(idMensaje, respuesta);

    res.status(200).json({ mensaje: response });

  } catch (error) {

    res.status(500).json({ mensaje: error });

  }
}