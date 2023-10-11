import { KafkaConfig } from "../config/KafkaConfig.js";

// Punto 4d
export const voteNotVote = async (req, res) => {
  
  const kafka = new KafkaConfig();
  
  const consumer = kafka.createConsumer();

  const idUser = req.params.idUser;

  const idRecipe = req.params.idRecipe;

  let messagesReceived = false;

  try {

    // 1 - Conexion con el servidor de Kafka
    await consumer.connect();
    
    // 2 - Se suscripcion al topico de Kafka, desde el principio
    await consumer.subscribe({topic: process.env.POPULARIDAD_RECETA, fromBeginning: true})

    // 3 - Se consumen los mensajes del topico
    consumer.run({
      eachBatchAutoResolve: false,
      eachBatch: async ({ batch }) => {

        let messsages = {vote: false}

        for (let message of batch.messages) {

          let messageObj = JSON.parse(message.value.toString());
     
          if(messageObj.idUser == idUser && messageObj.idRecipe == idRecipe){
            messsages = {vote: true};
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