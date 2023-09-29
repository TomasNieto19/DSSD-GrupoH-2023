import { KafkaConfig } from "./KafkaConfig.js";

const kafka = new KafkaConfig();

export const getFollowersUser = async (req, res) => {
  
  //const consumer = kafka.consumer({ groupId: "test" })
  const consumer = kafka.consumer;

  try {

    // 1 - Conexion con el servidor de Kafka
    await consumer.connect();
    
    // 2 - Se suscripcion al topico de Kafka, desde el principio
    await consumer.subscribe({topic: "followersPopularity10", fromBeginning: true})

    // 3 - Se consumen los mensajes del topico
    consumer.run({
      eachBatchAutoResolve: false,
      eachBatch: async ({ batch }) => {

        let messsages = []
        for (let message of batch.messages) {
          let messageObj = JSON.parse(message.value.toString());
          let usuarioEncontrado = false;
            for(let i = 0; i < messsages.length; i++){
              if(messsages[i].idUser === messageObj.idUser){
                messsages[i].follow +=messageObj.follow
                usuarioEncontrado = true;
              }
            }
            if(!usuarioEncontrado){
              messsages.push(messageObj);
            }
        }
        res.json(messsages)
        consumer.disconnect()
      }
    })
    
  } catch (error) {

    console.error("ERROR EN CONSUMER: " + error);

  }
};

export const getComments = async (req, res) => {
  
  //const consumer = kafka.consumer({ groupId: "test" })
  const consumer = kafka.consumer;
  const {id} = req.params;
  try {

    // 1 - Conexion con el servidor de Kafka
    await consumer.connect();
    
    // 2 - Se suscripcion al topico de Kafka, desde el principio
    await consumer.subscribe({topic: "comentarios3", fromBeginning: true})

    // 3 - Se consumen los mensajes del topico
    consumer.run({
      eachBatchAutoResolve: false,
      eachBatch: async ({ batch }) => {

        let messsages = []
        for (let message of batch.messages) {
          let messageObj = JSON.parse(message.value.toString());
          if(messageObj.idRecipe == id){
            messsages.push(messageObj.commentary);
          }
        }
        res.json(messsages)
        consumer.disconnect()
      }
    })
    
  } catch (error) {

    console.error("ERROR EN CONSUMER: " + error);

  }
};
