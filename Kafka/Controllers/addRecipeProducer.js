import { KafkaConfig } from "../config/KafkaConfig.js";

const kafka = new KafkaConfig();

// Punto 1
export const addRecipeProducer = async (req, res) => {
    
  const producer = kafka.producer;

  try {
    
    // 1 - Conexión con el servidor de Kafka
    await producer.connect();

    // 2 - Extraer información necesaria del cuerpo de la solicitud (req.body)
    const { username, recipeTitle, firstPhotoUrl } = req.body;

    // 3 - Crear un objeto con la información de la receta
    const recipeInfo = {
      username,
      recipeTitle,
      firstPhotoUrl,
    };

    // Convertir el objeto a JSON String
    const message = JSON.stringify(recipeInfo);

    // 4 - Enviar el mensaje al tópico de Kafka "Novedades"
    await producer.send({topic: process.env.NOVEDADES, messages: [{ value: message }]});

    // 5 - Responder al cliente
    res.status(200).json({ message: "La receta se ha publicado con éxito!" });

  } catch (error) {

    console.error("ERROR EN PRODUCER: " + error);

  } finally {

    // 6 - Desconexión del servidor Kafka
    await producer.disconnect();

  }
};