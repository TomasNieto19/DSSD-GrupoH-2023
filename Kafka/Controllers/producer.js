import { KafkaConfig } from "../config/KafkaConfig.js";

const kafka = new KafkaConfig();

export const produceMessageKafka = async (req, res) => {

  const producer = kafka.producer;
  
  try {

    // 1 - Conexion con el servidor de Kafka
    await producer.connect();
    
    // 2 - Se convierte el body a JSON String
    const message = JSON.stringify(req.body);
   
    // 3 - Envia el mensaje al topico de Kafka
    await producer.send({topic: "my-topic", messages:[{value: message}]})
   
    // 4 - Responde al cliente
    res.status(200).json({ message: "Mensaje recibido!" });

  } catch (error) {

    console.error("ERROR EN PRODUCER: " + error);

  } finally {
    
    // 5 - Se desconecta del servidor Kafka
    await producer.disconnect();

  }
};