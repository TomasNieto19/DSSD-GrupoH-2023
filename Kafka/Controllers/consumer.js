import { KafkaConfig } from "../config/KafkaConfig.js";

export const getKafkaMessages = async (req, res) => {
  
  const kafka = new KafkaConfig();
  
  const consumer = kafka.createConsumer();

  let messagesReceived = false;

  try {

    // 1 - Conexion con el servidor de Kafka
    await consumer.connect();
    
    // 2 - Se suscripcion al topico de Kafka, desde el principio
    await consumer.subscribe({topic: "my-topic", fromBeginning: true})

    // 3 - Se consumen los mensajes del topico
    consumer.run({
      eachBatchAutoResolve: false,
      eachBatch: async ({ batch }) => {

        let messages = []

        for (let message of batch.messages) {

          messages.push(JSON.parse(message.value.toString()))

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

    console.error("ERROR EN CONSUMER: " + error);

  }
};