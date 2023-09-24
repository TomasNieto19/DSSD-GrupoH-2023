import { KafkaConfig } from "./KafkaConfig.js";

const kafka = new KafkaConfig();

export const getKafkaMessages = async (req, res) => {
  
  const consumer = kafka.consumer;

  try {

    // 1 - Conexion con el servidor de Kafka
    await consumer.connect();
    
    // 2 - Se suscripcion al topico de Kafka, desde el principio
    await consumer.subscribe({topic: "my-topic", fromBeginning: true})

    // 3 - Se consumen los mensajes del topico
    consumer.run({
      eachBatchAutoResolve: false,
      eachBatch: async ({ batch }) => {

        let messsages = []

        for (let message of batch.messages) {

          messsages.push(JSON.parse(message.value.toString()))

        }

        res.json(messsages)

        consumer.disconnect()
      }
    })
    
  } catch (error) {

    console.error("ERROR EN CONSUMER: " + error);

  }
};