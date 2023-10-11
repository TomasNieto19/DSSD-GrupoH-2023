import { KafkaConfig } from "../config/KafkaConfig.js";

// Punto 4d parte 1
export const recipesScoreConsummerId = async (req, res) => {
  
  const kafka = new KafkaConfig();
  
  const consumer = kafka.createConsumer();

  const {id} = req.params

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
           console.log(recipe.value.toString())
          recipes.push(JSON.parse(recipe.value.toString()))

        }
        
        // 4 - Se calcula el puntaje promedio de las recetas y retorna un array con las recetas y su puntaje promedio
        const recipesAverageScore = calcularPuntajePromedioDeRecetas(recipes, id);

        res.json(recipesAverageScore)

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

function calcularPuntajePromedioDeRecetas(recipes, id) {

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

    let recipe;

    if(recipeItem.idRecipe == id){
        recipe = {
            idRecipe: recipeItem.idRecipe,
            averageScore: recipeItem.score / recipeItem.elements
          };
    }
    if(recipe){recetasPromedio.push(recipe);}
    

  });

  return recetasPromedio;
}