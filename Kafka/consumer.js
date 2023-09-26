import { KafkaConfig } from "./KafkaConfig.js";

const kafka = new KafkaConfig();

// Almacena todos los puntajes de recetas
let allRecipePuntajes = [];

// Almacena el puntaje promedio y comentarios de la receta actual
let currentRecipeStats = {
  puntajePromedio: 0,
  comentarios: [],
};

export const getKafkaMessages = async (req, res) => {
  const consumer = kafka.consumer;

  try {
    // 1 - Conexion con el servidor de Kafka
    await consumer.connect();
    
    // 2 - Se suscripción a los tópicos relevantes
    await consumer.subscribe({ topic: "my-topic2", fromBeginning: true });
    await consumer.subscribe({ topic: "PopularidadReceta" });
    await consumer.subscribe({ topic: "ComentariosReceta" });

    // 3 - Se consumen los mensajes del tópico
    consumer.run({
      eachBatchAutoResolve: false,
      eachBatch: async ({ batch }) => {
        for (let message of batch.messages) {
          const recipe = JSON.parse(message.value.toString());

          // Actualizar el puntaje promedio si llega un mensaje de puntuación
          if (message.topic === "PopularidadReceta") {
            const puntaje = parseInt(message.headers.puntaje);
            allRecipePuntajes.push(puntaje);

            // Calcular el nuevo puntaje promedio sobre todas las recetas
            currentRecipeStats.puntajePromedio = calculateAverage(allRecipePuntajes);

            // Envía el puntaje promedio actualizado a la interfaz de usuario
            // (Ver como hacer para enviar datos a la interfaz de usuario)
          }

          // Agregar comentarios si llega un mensaje de comentarios
          if (message.topic === "ComentariosReceta") {
            const comentario = message.value.toString();
            currentRecipeStats.comentarios.push(comentario);

            // Envía los comentarios actualizados a la interfaz de usuario
            // (Ver como hacer para enviar datos a la interfaz de usuario)
          }
        }

        // Enviar las últimas 5 recetas al cliente
        res.json(currentRecipeStats);
      }
    });
  } catch (error) {
    console.error("ERROR EN CONSUMER: " + error);
  }
};

// Función para calcular el promedio
function calculateAverage(array) {
  if (array.length === 0) {
    return 0;
  }
  const sum = array.reduce((acc, currentValue) => acc + currentValue, 0);
  return sum / array.length;
}