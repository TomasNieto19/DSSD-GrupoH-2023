import { KafkaConfig } from "../config/KafkaConfig.js";

const kafka = new KafkaConfig();

// Punto 1
export const recipesConsumer = async (req, res) => {

  const consumer = kafka.consumer;

  try {
    
    // 1 - Conexión con el servidor de Kafka
    await consumer.connect();

    // 2 - Suscripción al tópico de Kafka, desde el principio
    await consumer.subscribe({ topic: process.env.NOVEDADES, fromBeginning: true });

    // 3 - Consumir los mensajes del tópico
    consumer.run({
      eachBatchAutoResolve: false,
      eachBatch: async ({ batch }) => {

        let messages = [];

        for (let message of batch.messages) {
          messages.push(JSON.parse(message.value.toString()));
        }

        // Responder al cliente con los mensajes
        res.json(messages);

        consumer.disconnect();
      },
    });
    
    setTimeout(() => {
      consumer.disconnect()
      return res.status(204).json({message: "No hay elementos en el topico."});
    }, 2000);

  } catch (error) {

    console.error("ERROR EN CONSUMER DE RECETAS: " + error);

  }
};
