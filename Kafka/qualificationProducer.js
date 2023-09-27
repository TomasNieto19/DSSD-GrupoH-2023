import { KafkaConfig } from "./KafkaConfig.js";

const kafka = new KafkaConfig();

// Punto 4b
export const qualificationProducer = async (req, res) => {

  const producer = kafka.producer;

  try {

    // 1 - Conexion con el servidor de Kafka
    await producer.connect();
    
    // 2 - Se convierte el body a JSON String
    const message = JSON.stringify(req.body);

    // 3 - Envia el mensaje al topico de Kafka
    await producer.send({topic: "popularity-recipe", messages:[{value: message}]})
   
    // 4 - Responde al cliente
    res.status(200).json({ message: "Calificacion recibida!" });

  } catch (error) { 

    console.error("ERROR EN PRODUCTOR COMENTARIOS: " + error);

  } finally {
    
    // 5 - Se desconecta del servidor Kafka
    await producer.disconnect();

  }
};