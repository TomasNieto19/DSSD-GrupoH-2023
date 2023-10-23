import { sendMessage } from "../config/MySqlConfig.js";

export async function enviarMensaje(req, res) {

  // Construye un objeto que contiene los datos del mensaje
  const messageData = {
    idRemitente: req.body.idRemitente,
    idDestinatario: req.body.idDestinatario,
    asunto: req.body.asunto,
    mensaje: req.body.mensaje,
  };

  // Guarda el mensaje en la base de datos
  try {

    let response = await sendMessage(messageData);

    res.status(200).json({ mensaje: response });

  } catch (error) {

    res.status(500).json({ mensaje: error });

  }
}