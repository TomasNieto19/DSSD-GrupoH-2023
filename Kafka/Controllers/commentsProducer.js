import { KafkaConfig } from "../config/KafkaConfig.js";

const kafka = new KafkaConfig();

// Punto 4a
export const commentsProducer = async (req, res) => {

  const producer = kafka.producer;

  try {

    // 1 - Conexion con el servidor de Kafka
    await producer.connect();
    
    // 2 - Se convierte el body a JSON String
    const message = JSON.stringify(req.body);

    // 3 - Envia el mensaje al topico de Kafka
    await producer.send({topic: "Comentarios1", messages:[{value: message}]})
   
    // 4 - Responde al cliente
    res.status(200).json({ message: "Comentario recibido!" });

    // 5 - Envia la popularidad de la receta (Punto 4a parte 2)
    const messagePopularidadReceta = { idRecipe: req.body.idRecipeComment, score: 1 };

    await producer.send({topic: "PopularidadReceta", messages:[{value: JSON.stringify(messagePopularidadReceta)}]});

  } catch (error) { 

    console.error("ERROR EN PRODUCTOR COMENTARIOS: " + error);

  } finally {
    
    // 6 - Se desconecta del servidor Kafka
    await producer.disconnect();

  }
};