import express from "express";
import { produceMessageKafka } from "./producer.js";
import { getKafkaMessages } from "./consumer.js";
import { commentsProducer } from "./commentsProducer.js";
import { qualificationProducer } from "./qualificationProducer.js";

const router = express.Router();

/**
 * @swagger
 * /Productor:
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
router.post("/Productor", produceMessageKafka);

/**
 * @swagger
 * /Consumidor:
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
router.get("/Consumidor", getKafkaMessages);

/**
 * @swagger
 * /comments:
 *   post:
 *     summary: Envia los comentarios de una receta al tópico de comentarios.
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
router.post("/comments", commentsProducer);

/**
 * @swagger
 * /qualification:
 *   post:
 *     summary: Envia la calificación de una receta.
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
router.post("/qualification", qualificationProducer);

export default router;