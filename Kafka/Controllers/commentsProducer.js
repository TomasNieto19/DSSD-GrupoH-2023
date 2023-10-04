import { KafkaConfig } from "../config/KafkaConfig.js";

const kafka = new KafkaConfig();

// Punto 4a + 4e
export const commentsProducer = async (req, res) => {

  const producer = kafka.producer;
  
  const { idUserComment, idRecipeComment, comment, idUserRecipeCreator } = req.body;

  try {

    // 1 - Conexion con el servidor de Kafka
    await producer.connect();
    
    // 2 - Se convierte el body a JSON String;
    const message = JSON.stringify({ idUserComment, idRecipeComment, comment });

    // 3 - Envia el mensaje al topico de Kafka
    await producer.send({topic: "Comentarios", messages:[{value: message}]})
   
    // Reestriccion por si el usuario que comenta es el mismo que creo la receta, no cuenta para el cálculo de popularidad
    if( idUserComment == idUserRecipeCreator ) {
      res.status(200).json({message: "Comentario recibido, no afecta calculo de popularidad por comentar la receta propia"});
      return;
    }

    // 4 - Responde al cliente
    res.status(200).json({ message: "Comentario recibido!" });

    // 5 - Envia la popularidad de la receta (Punto 4a parte 2)
    const messagePopularidadReceta = { idRecipe: idRecipeComment, score: 1 };

    await producer.send({topic: "PopularidadReceta", messages:[{value: JSON.stringify(messagePopularidadReceta)}]});

  } catch (error) { 

    console.error("ERROR EN PRODUCTOR COMENTARIOS: " + error);

  } finally {
    
    // 6 - Se desconecta del servidor Kafka
    await producer.disconnect();

  }
};