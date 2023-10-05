import { KafkaConfig } from "../config/KafkaConfig.js";

const kafka = new KafkaConfig();

// Punto 4d
export const commentsConsumer = async (req, res) => {
  
  const consumer = kafka.consumer;

  const id = req.params.id;

  let messagesReceived = false;

  try {

    // 1 - Conexion con el servidor de Kafka
    await consumer.connect();
    
    // 2 - Se suscripcion al topico de Kafka, desde el principio
    await consumer.subscribe({topic: process.env.COMENTARIOS, fromBeginning: true})

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
        messagesReceived = true;
        consumer.disconnect()
      }
    })

    setTimeout(() => {
      if (!messagesReceived) {
        consumer.disconnect();
        res.status(204).json({ message: "No hay elementos en el tópico." });
      }
    }, process.env.TIMEOUT);
    
  } catch (error) {

    console.error("ERROR EN CONSUMER COMENTARIOS DE RECETA POR ID: " + error);

  }
};