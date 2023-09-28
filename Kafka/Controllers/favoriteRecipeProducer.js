import { KafkaConfig } from "../config/KafkaConfig.js";

const kafka = new KafkaConfig();

/* BODY EXPECTED
{
    idRecipe: 1,
    isFavorited: true,
    usernameRecipeCreator: "username"
}
*/

// Punto 4c
export const favoriteRecipeProducer = async (req, res) => {

  const producer = kafka.producer;

  try {

    // 1 - Conexion con el servidor de Kafka
    await producer.connect();

    // 2 - Determina si se marcó como favorita o se desmarcó
    const isFavorited = req.body.isFavorited;

    // 3 - Determina el puntaje a enviar al topic "PopularidadReceta"
    const recetaPuntaje = isFavorited ? 1 : -1;

    // 4 - Se crea el mensaje a enviar al topic "PopularidadReceta" 
    const messagePopularidadReceta = { idRecipe: req.body.idRecipeComment, score: recetaPuntaje };

    // 5 - Envia el mensaje al topic "PopularidadReceta" 
    await producer.send({topic: "PopularidadReceta", messages:[{value: JSON.stringify(messagePopularidadReceta)}]});

    // 6 - Responde al cliente
    res.status(200).json({ message: "Mensaje popularidad receta recibido!" });





    // VALIDAR CON EL PUNTO 3 ( NOMBRE DEL TOPICO Y NOMBRE DE LOS CAMPOS DEL MENSAJE )
    // 7 - Se crea el mensaje a enviar al topic "PopularidadUsuario" 
    const messagePopularidadUsuario = { username: req.body.usernameRecipeCreator, score: recetaPuntaje };

    // 8 - Envia el mensaje al topic "PopularidadUsuario" 
    await producer.send({topic: "PopularidadUsuario", messages:[{value: JSON.stringify(messagePopularidadUsuario)}]});

  } catch (error) {

    console.error("ERROR EN FAVORITE RECIPE PRODUCER: " + error);

  } finally {

    // 8 - Se desconecta del servidor Kafka
    await producer.disconnect();

  }
};