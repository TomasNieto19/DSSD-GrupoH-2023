import { KafkaConfig } from "../config/KafkaConfig.js";

// Punto 1
export const recipesConsumer = async (req, res) => {

  const kafka = new KafkaConfig();
  
  const consumer = kafka.createConsumer();

  let messagesReceived = false;

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

        messagesReceived = true;

        consumer.disconnect();
      },
    });
    
    setTimeout(() => {
      if (!messagesReceived) {
        consumer.disconnect();
        res.status(204).json({ message: "No hay elementos en el tópico." });
      }
    }, process.env.TIMEOUT);

  } catch (error) {

    console.error("ERROR EN CONSUMER DE RECETAS: " + error);

  }
};
