// En KafkaConfig.js
import { Kafka } from "kafkajs";

class KafkaConfig {
  constructor() {
    this.kafka = new Kafka({
      clientId: "DSSD-GrupoH-2023",
      brokers: ["localhost:9092"]
    });
    this.producer = this.kafka.producer({ groupId: "Consumer" });
    this.consumer = this.kafka.consumer({ groupId: "Consumer" });
  }
}

export { KafkaConfig }; // Asegúrate de exportar la clase correctamente
