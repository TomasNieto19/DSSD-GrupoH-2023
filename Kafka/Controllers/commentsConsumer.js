import { KafkaConfig } from "../config/KafkaConfig.js";

const kafka = new KafkaConfig();

// Punto 4d
export const commentsConsumer = async (req, res) => {
  
  const consumer = kafka.consumer;

  const id = req.params.id;

  try {

    // 1 - Conexion con el servidor de Kafka
    await consumer.connect();
    
    // 2 - Se suscripcion al topico de Kafka, desde el principio
    await consumer.subscribe({topic: "Comentarios", fromBeginning: true})

    // 3 - Se consumen los mensajes del topico
    consumer.run({
      eachBatchAutoResolve: false,
      eachBatch: async ({ batch }) => {

        let messsages = []

        for (let message of batch.messages) {

          let messageObj = JSON.parse(message.value.toString());
     
          if(messageObj.idRecipeComment == id){
            messsages.push(messageObj);
          }

        }
        
        res.json(messsages)
        consumer.disconnect()
      }
    })

    setTimeout(() => {
      consumer.disconnect()
      return res.status(204).json({message: "No hay elementos en el topico."});
    }, 2000);
    
  } catch (error) {

    console.error("ERROR EN CONSUMER COMENTARIOS DE RECETA POR ID: " + error);

  }
};