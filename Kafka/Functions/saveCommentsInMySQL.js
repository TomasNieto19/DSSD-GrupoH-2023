import { saveCommentInMySQL } from "../config/MySqlConfig.js";
import { KafkaConfig } from "../config/KafkaConfig.js";

export const saveCommentsInMySQL = async () => {

  console.log(`\n\nConsumer que guarda comentarios en la base de datos: ${new Date().getHours()}:${new Date().getMinutes()}\n\n`);

  const kafka = new KafkaConfig();

  const consumer = kafka.consumer;

  let messagesReceived = false;

  try {

    // 1 - Conexion con el servidor de Kafka
    await consumer.connect();

    // 2 - Se suscripcion al topico de Kafka, desde el principio
    await consumer.subscribe({topic: process.env.COMENTARIOS,fromBeginning: true});

    // 3 - Se consumen los mensajes del topico
    consumer.run({
      eachBatchAutoResolve: false,
      eachBatch: async ({ batch, resolveOffset }) => {

        for (let message of batch.messages) {

          let messageObj = JSON.parse(message.value.toString());

          messagesReceived = true;

          // Guarda el comentario en la base de datos
          saveCommentInMySQL(messageObj, (err, result) => {
            if (err) {
              console.error("Error al insertar el comentario:", err);
            } else {
              console.log("Comentario insertado con éxito:", result);
            }
          });
        
          // Lo marca como leido para no volver a guardarlo
          resolveOffset(message.offset);

        }

        consumer.disconnect();
      },
    });

    setTimeout(() => {
      if (!messagesReceived) {
        consumer.disconnect();
      }
    }, process.env.TIMEOUT);


  } catch (error) {
    console.error("ERROR EN CONSUMER QUE GUARDA COMENTARIOS EN LA BASE DE DATOS: " + error);
  }
};