import { KafkaConfig } from "../config/KafkaConfig.js";

const kafka = new KafkaConfig();

// Punto 4d parte 2
export const getFollowersUser = async (req, res) => {

  const consumer = kafka.consumer;

  try {
    // 1 - Conexion con el servidor de Kafka
    await consumer.connect();

    // 2 - Se suscripcion al topico de Kafka, desde el principio
    await consumer.subscribe({topic: "PopularidadUsuario", fromBeginning: true});

    // 3 - Se consumen los mensajes del topico
    consumer.run({
      eachBatchAutoResolve: false,
      eachBatch: async ({ batch }) => {

        let messsages = [];

        for (let message of batch.messages) {

          let messageObj = JSON.parse(message.value.toString());
          let usuarioEncontrado = false;

          for (let i = 0; i < messsages.length; i++) {

            if (messsages[i].idUser === messageObj.idUser) {

              messsages[i].follow += messageObj.follow;
              usuarioEncontrado = true;
              
            }

          }

          if (!usuarioEncontrado) {
            messsages.push(messageObj);
          }
        }
        messsages.sort((a, b) => b.follow - a.follow)
        res.json(messsages);
        consumer.disconnect();

      },
    });
  } catch (error) {

    console.error("ERROR EN CONSUMER DE POPULARIDAD USUARIO: " + error);

  }
};