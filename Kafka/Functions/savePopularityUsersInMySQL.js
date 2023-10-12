
import { KafkaConfig } from "../config/KafkaConfig.js";
import { getUsersPopularityFromMySQL, updateUserPopularityInMySQL } from "../config/MySqlConfig.js";

// Punto 4d parte 2
export const savePopularityUsersInMySQL = async () => {

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

        console.log(scoreMap);
        console.log(messsages);

        // Suma el score de la base de datos al score calculado
        messsages.forEach(user => {

          user.follow += scoreMap[user.idUser];

            // Guarda el score en la base de datos
            updateUserPopularityInMySQL(user.idUser, user.follow, (err, result) => {
              if (err) {
                console.error("Error al actualizar la popularidad del usuario:", err);
              } else {
                console.log("Popularidad del usuario actualizada:", result);
              }
            });
        });
        
        console.log(messsages);

        messagesReceived = true;
        consumer.disconnect();

      },
    });

    setTimeout(() => {
      if (!messagesReceived) {
        consumer.disconnect();
      }
    }, process.env.TIMEOUT);
    
  } catch (error) {

    console.error("ERROR EN CONSUMER DE POPULARIDAD USUARIO QUE GUARDA EN LA BD: " + error);

  }
};