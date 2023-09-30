import { KafkaConfig } from "../config/KafkaConfig.js";

const kafka = new KafkaConfig();

// Punto 3
export const sendFollowerProducer = async (req, res) => {

  const producer = kafka.producer;
  
  try {

    // 1 - Conexion con el servidor de Kafka
    await producer.connect();
    
    // 2 - Se convierte el body a JSON String
    const message = JSON.stringify(req.body);
    const objMessage = JSON.parse(message);
    const {followed} = objMessage;
    let newMessage;
    
    if(followed){

      newMessage = {

        "idUser": objMessage.idUser,
        "follow": -1

      }

    }else{

      newMessage = {

        "idUser": objMessage.idUser,
        "follow": 1

      }

    }
   
    // 3 - Envia el mensaje al topico de Kafka
    await producer.send({topic: "followersPopularity10", messages:[{value: JSON.stringify(newMessage)}]})
   
    // 4 - Responde al cliente
    res.status(200).json({ message: "Mensaje popularidad de usuario recibido!" });

  } catch (error) {

    console.error("ERROR EN PRODUCER: " + error);

  } finally {
    
    // 5 - Se desconecta del servidor Kafka
    await producer.disconnect();

  }
};