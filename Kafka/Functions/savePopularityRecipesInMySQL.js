import { updateRecipePopularityInMySQL } from "../config/MySqlConfig.js";
import { KafkaConfig } from "../config/KafkaConfig.js";

export const savePopularityRecipesInMySQL = async () => {
  
  const kafka = new KafkaConfig();
  
  const consumer = kafka.createConsumer();

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

        let recipes = []

        for (let recipe of batch.messages) {
           
          messagesReceived = true; 

          recipes.push(JSON.parse(recipe.value.toString()))

        }
        
        consumer.disconnect()

        // 4 - Se calcula el puntaje promedio de las recetas y retorna un array con las recetas y su puntaje promedio
        const recipesAverageScore = calcularPuntajePromedioDeRecetas(recipes);

        recipesAverageScore.forEach(recipe => {

            // 5 - Se actualiza el puntaje de la receta en la base de datos
            updateRecipePopularityInMySQL(recipe.idRecipe, recipe.averageScore, (err, result) => {
                if (err) {
                console.error("Error al actualizar el puntaje de la receta:", err);
                } else {
                console.log("Puntaje de la receta actualizado con éxito:", result);
                }
            });

        });
      }
    })
    
    setTimeout(() => {
      if (!messagesReceived) {
        consumer.disconnect();
      }
    }, process.env.TIMEOUT);

  } catch (error) {

    console.error("ERROR EN CONSUMER: " + error);

  }
};

function calcularPuntajePromedioDeRecetas(recipes) {

  const puntajesTotalesPorReceta = recipes.reduce((result, item) => {

    const { idRecipe, score } = item;

    if (!result[idRecipe]) {

      result[idRecipe] = {
        idRecipe,
        score: 0,
        elements: 0
      };
    }

    result[idRecipe].score += score;
    result[idRecipe].elements += 1;

    return result;

  }, {});

  const resultadoFinal = Object.values(puntajesTotalesPorReceta);

  const recetasPromedio = [];

  resultadoFinal.forEach(recipeItem => {

    const recipe = {
      idRecipe: recipeItem.idRecipe,
      averageScore: recipeItem.score / recipeItem.elements
    };
    
    recetasPromedio.push(recipe);

  });

  return recetasPromedio;
}