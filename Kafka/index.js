import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import { enviarComentarioKafka, produceMessageKafka } from "./producer.js";
import { getComments, getFollowersUser} from "./consumer.js";

const app = express();

const jsonParser = bodyParser.json();

app.use(cors());

app.post('/enviarSeguidor', jsonParser, produceMessageKafka);

app.get('/traerSeguidores', getFollowersUser);

app.post('/enviarComentario', jsonParser, enviarComentarioKafka);

app.get('/traerComentarios/:id', getComments);

app.listen(8082, () => console.log("\nServer is running on port 8082.\n"));