import express from "express";
import bodyParser from "body-parser";
import { produceMessageKafka } from "./producer.js";
import { getKafkaMessages } from "./consumer.js";

const app = express();

const jsonParser = bodyParser.json();

app.post('/Productor', jsonParser, produceMessageKafka);

app.get('/Consumidor', getKafkaMessages);

app.listen(8080, () => console.log("\nServer is running on port 8080.\n"));