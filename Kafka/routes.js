import express from "express";
import { produceMessageKafka } from "./Controllers/producer.js";
import { getKafkaMessages } from "./Controllers/consumer.js";
import { commentsProducer } from "./Controllers/commentsProducer.js";
import { qualificationProducer } from "./Controllers/qualificationProducer.js";
import { favoriteRecipeProducer } from "./Controllers/favoriteRecipeProducer.js";
import { commentsConsumer } from "./Controllers/commentsConsumer.js";
import { recipesScoreConsummer } from "./Controllers/recipesScoreConsummer.js";

const router = express.Router();

/**
 * @swagger
 * /kafka/Productor:
 *   post:
 *     summary: Enviar un mensaje a un tópico de Kafka.
 *     requestBody:
 *       description: Datos del mensaje a enviar.
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               message:
 *                 type: string
 *     responses:
 *       200:
 *         description: Mensaje recibido!
 */
router.post("/kafka/Productor", produceMessageKafka);

/**
 * @swagger
 * /kafka/Consumidor:
 *   get:
 *     summary: Lee mensajes de un tópico de Kafka.
 *     responses:
 *       200:
 *         description: Devuelve los mensajes obtenidos desde Kafka.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   message:
 *                     type: string
 */
router.get("/kafka/Consumidor", getKafkaMessages);

/**
 * @swagger
 * /kafka/comments:
 *   post:
 *     summary: Envia los comentarios de una receta al tópico de comentarios y +1 al topico de popularidad de la receta.
 *     requestBody:
 *       description: Datos del comentario a enviar.
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               idUserComment:
 *                 type: integer
 *               idRecipeComment:
 *                 type: integer
 *               comment:
 *                 type: string
 *     responses:
 *       200:
 *         description: Comentario recibido!
 */
router.post("/kafka/comments", commentsProducer);

/**
 * @swagger
 * /kafka/qualification:
 *   post:
 *     summary: Envia la calificación de una receta al topico PopularidadReceta.
 *     requestBody:
 *       description: Datos de la calificación a enviar.
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               idRecipe:
 *                 type: integer
 *               score:
 *                 type: integer
 *     responses:
 *       200:
 *         description: Calificación recibida!
 */
router.post("/kafka/qualification", qualificationProducer);

/**
 * @swagger
 * /kafka/favoriteRecipe:
 *   post:
 *     summary: Marcar o desmarcar una receta como favorita suma +-1 a la receta y al autor de la receta.
 *     requestBody:
 *       description: Datos a enviar.
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               idRecipe:
 *                 type: integer
 *               isFavorited:
 *                 type: boolean
 *               userIdCreator:
 *                 type: integer
 *     responses:
 *       200:
 *         description: Mensaje de favorito recibido!
 */
router.post("/kafka/favoriteRecipe", favoriteRecipeProducer);

/**
 * @swagger
 * /kafka/comments/{idReceta}:
 *   get:
 *     summary: Obtener comentarios de una receta por su ID.
 *     parameters:
 *       - in: path
 *         name: idReceta
 *         required: true
 *         description: ID de la receta para la que se desean obtener comentarios.
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Comentarios obtenidos correctamente.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   comment:
 *                     type: string                  
 */
router.get("/kafka/comments/:idReceta", commentsConsumer);

/**
 * @swagger
 * /kafka/recipesScore:
 *   get:
 *     summary: Retorna las recetas y su puntaje promedio, de las que se encuentren en el tópico PopularidadReceta.
 *     responses:
 *       200:
 *         description: Comentarios obtenidos correctamente.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   comment:
 *                     type: string
 */
router.get("/kafka/recipesScore", recipesScoreConsummer);

export default router;