import { KafkaConfig } from "../config/KafkaConfig.js";

const kafka = new KafkaConfig();

// Punto 4d
export const commentsConsumer = async (req, res) => {
  
  const consumer = kafka.consumer;

  try {

    // 1 - Conexion con el servidor de Kafka
    await consumer.connect();
    
    // 2 - Se suscripcion al topico de Kafka, desde el principio
    await consumer.subscribe({topic: "Comentarios", fromBeginning: true})

    // 3 - Obtiene el id de la receta para obtener los comentarios
    const idRecipeParams = req.params.idReceta

    // 4 - Se consumen los mensajes del topico comentarios
    consumer.run({
      eachBatchAutoResolve: false,
      eachBatch: async ({ batch }) => {

        let comments = []

        for (let message of batch.messages) {

            // 5 - Se filtran los mensajes por el id de la receta
            if( JSON.parse(message.value.toString()).idRecipeComment == idRecipeParams ){

                comments.push(JSON.parse(message.value.toString()))

            }

        }

        res.json(comments)

        consumer.disconnect()
      }
    })
    
  } catch (error) {

    console.error("ERROR EN CONSUMER: " + error);

  }
};