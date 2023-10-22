import { getCommentsFromMySQL } from "../config/MySqlConfig.js";
import { KafkaConfig } from "../config/KafkaConfig.js";

const kafka = new KafkaConfig();

// Punto 4d
export const commentsConsumer = async (req, res) => {
  
  const consumer = kafka.createConsumer();

  const id = req.params.id;

  let messagesReceived = false;
 
 try {

    // Trae los comentarios de la base de datos
    let commentsDB = await getCommentsFromMySQL(id);

    let messages = passageDBtoJSON(commentsDB);
      
    // 1 - Conexion con el servidor de Kafka
    await consumer.connect();
    
    // 2 - Se suscripcion al topico de Kafka, desde el principio
    await consumer.subscribe({topic: process.env.COMENTARIOS, fromBeginning: true})

    // 3 - Se consumen los mensajes del topico
    await consumer.run({
      eachBatchAutoResolve: false,
      eachBatch: async ({ batch }) => {

        for (let message of batch.messages) {

          let messageObj = JSON.parse(message.value.toString());
     
          if(messageObj.idRecipeComment == id){
            messages.push(messageObj);
          }

        }
        
        res.json(messages)
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

function passageDBtoJSON(messagesDB){

  let messages = messagesDB.map(row => ({

    idUserComment: row.id_user_comment,
    idRecipeComment: row.id_recipe_comment,
    comment: row.comment
  }));

  return messages;
}