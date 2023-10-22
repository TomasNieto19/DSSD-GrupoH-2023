import express from "express";
import {  methodPost } from "./Controllers/methodPost.js";
import {  methodGet } from "./Controllers/methodGet.js";
import { enviarMensaje } from "./Controllers/enviarMensaje.js";
import { leerMensajes } from "./Controllers/recibirMensaje.js";

const router = express.Router();


/**
 * @swagger
 * /rest/post:
 *   post:
 *     summary: Envia un mensaje al server REST
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
router.post("/rest/post", methodPost);

/**
 * @swagger
 * /rest/get:
 *   get:
 *     summary: Lee un mensaje.
 *     responses:
 *       200:
 *         description: Lee un mensaje
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
router.get("/rest/get", methodGet);

/**
 * @swagger
 * /rest/get:
 *   get:
 *     summary: envia un mensaje.
 *     responses:
 *       200:
 *         description: envia un mensaje
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
router.post("/rest/enviar", enviarMensaje);

/**
 * @swagger
 * /rest/get:
 *   get:
 *     summary: Lee un mensaje.
 *     responses:
 *       200:
 *         description: Lee un mensaje
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
router.get("/rest/leer", leerMensajes);



export default router;