import { KafkaConfig } from "../config/KafkaConfig.js";
import { getUsersPopularityFromMySQL } from "../config/MySqlConfig.js";

// Punto 4d parte 2
export const getFollowersUser = async (req, res) => {

  const kafka = new KafkaConfig();
  
  const consumer = kafka.createConsumer();

  let messagesReceived = false;

  const usersScoreDB = await getUsersPopularityFromMySQL();

  try {
    // 1 - Conexion con el servidor de Kafka
    await consumer.connect();

    // 2 - Se suscripcion al topico de Kafka, desde el principio
    await consumer.subscribe({topic: process.env.POPULARIDAD_USUARIO, fromBeginning: true});

    // 3 - Se consumen los mensajes del topico
    consumer.run({
      eachBatchAutoResolve: false,
      eachBatch: async ({ batch }) => {

        let messsages = [];

        for (let message of batch.messages) {

          let messageObj = JSON.parse(message.value.toString());
          let usuarioEncontrado = false;

          for (const element of messsages) {

            if (element.idUser === messageObj.idUser) {

              element.follow += messageObj.follow;
              usuarioEncontrado = true;
              
            }

          }

          if (!usuarioEncontrado) {
            messsages.push(messageObj);
          }
        }

        messsages.sort((a, b) => b.follow - a.follow)

        // Convierte el array de usuarios en un mapa, donde la clave es el id del usuario y el valor es el score
        const scoreMap = {};
        usersScoreDB.forEach(user => {
          scoreMap[user.id_user] = user.score;
        });

        // Suma el score de la base de datos al score calculado
        messsages.forEach(user => {
          user.follow += scoreMap[user.idUser];
        });
        
        res.json(messsages);
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

    console.error("ERROR EN CONSUMER DE POPULARIDAD USUARIO: " + error);

  }
};