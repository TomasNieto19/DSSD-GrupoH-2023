import { KafkaConfig } from "./KafkaConfig.js";

const kafka = new KafkaConfig();

export const getKafkaMessages = async (req, res) => {
  const consumer = kafka.consumer;

  try {
    // 1 - Conexión con el servidor de Kafka
    await consumer.connect();

    // 2 - Suscripción al tópico de Kafka, desde el principio
    await consumer.subscribe({ topic: "newnovedades", fromBeginning: true });

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
      },
    });
  } catch (error) {
    console.error("ERROR EN CONSUMER: " + error);
  } finally {
    // 4 - Desconexión del consumidor (debe estar fuera del bucle)
    await consumer.disconnect();
  }
};
