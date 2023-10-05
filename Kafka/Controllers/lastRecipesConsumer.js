import { KafkaConfig } from "../config/KafkaConfig.js";

const kafka = new KafkaConfig();

// Punto 2
export const lastRecipesConsumer = async (req, res) => {

  const consumer = kafka.consumer;

  // Almacena las últimas 5 recetas
  let lastFiveRecipes = [];

  try {

    // 1 - Conexion con el servidor de Kafka
    await consumer.connect();

    // 2 - Se suscripción al tópico de Kafka, desde el principio
    await consumer.subscribe({ topic: process.env.NOVEDADES, fromBeginning: true });

    // 3 - Se consumen los mensajes del tópico
    consumer.run({
      eachBatchAutoResolve: false,
      eachBatch: async ({ batch }) => {

        for (let message of batch.messages) {

          const recipe = JSON.parse(message.value.toString());

          // Agregar la receta a la lista de las últimas 5 recetas
          lastFiveRecipes.push(recipe);

          // Mantener solo las últimas 5 recetas
          if (lastFiveRecipes.length > 5) {
            lastFiveRecipes.shift(); // Elimina la receta más antigua
          }
        }

        // Enviar las últimas 5 recetas al cliente
        res.json(lastFiveRecipes);
        consumer.disconnect();
      },
    });

    setTimeout(() => {
      consumer.disconnect()
      return res.status(204).json({message: "No hay elementos en el topico."});
    }, 2000);
    
  } catch (error) {

    console.error("ERROR EN CONSUMER DE LAS ULTIMAS RECETAS: " + error);

  }
};