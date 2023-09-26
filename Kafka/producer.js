import { KafkaConfig } from "./KafkaConfig.js";

const kafka = new KafkaConfig();

export const produceMessageKafka = async (req, res) => {
  const producer = kafka.producer;

  try {
    // 1 - Conexion con el servidor de Kafka
    await producer.connect();

    // 2 - Se convierte el body a JSON String
    const message = JSON.stringify(req.body);

    // 3 - Determina si se marcó como favorita o se desmarcó
    const isFavorited = req.body.isFavorited; // Supongamos que tienes un campo "isFavorited" en tu mensaje

    // 4 - Envia el mensaje al topic "PopularidadReceta" con el puntaje correspondiente
    const recetaTopic = "PopularidadReceta";
    const recetaPuntaje = isFavorited ? 1 : -1; //a chequear
    await producer.send({ topic: recetaTopic, messages: [{ value: message, headers: { puntaje: recetaPuntaje.toString() } }] });

    // 5 - Guarda el nombre del usuario creador de la receta
    const nombreUsuario = req.body.nombreUsuario; // Asegúrate de tener este campo en tu mensaje

    // 6 - Envia el mensaje al topic "PopularidadUsuario" con el puntaje correspondiente
    const usuarioTopic = "PopularidadUsuario";
    const usuarioPuntaje = isFavorited ? 1 : -1; //a chequear
    await producer.send({ topic: usuarioTopic, messages: [{ value: message, key: nombreUsuario, headers: { puntaje: usuarioPuntaje.toString() } }] });

    // 7 - Responde al cliente
    res.status(200).json({ message: "Mensaje recibido!" });
  } catch (error) {
    console.error("ERROR EN PRODUCER: " + error);
  } finally {
    // 8 - Se desconecta del servidor Kafka
    await producer.disconnect();
  }
};