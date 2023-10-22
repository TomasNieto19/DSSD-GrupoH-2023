
import { responderMensaje } from "./Controllers/responderMensaje.js";

import express from "express";

import { getDrafts } from "./Controllers/getDrafts.js";
import { postDraft } from "./Controllers/postDraft.js";
import { getDraftsId } from "./Controllers/getDraftId.js";
import { putDraft } from "./Controllers/putDraft.js";
import { deleteDraft } from "./Controllers/deleteDraft.js";


import { enviarMensaje } from "./Controllers/enviarMensaje.js";
import { leerMensajes } from "./Controllers/leerMensajes.js";
import express from "express";


const router = express.Router();

// Endpoints pertenecientes al punto 3 -> Correo Interno

/**
 * @swagger
 * /rest/enviarMensaje:
 *   post:
 *     summary: Se envia un mensaje a otro usuario.
 *     requestBody:
 *       description: Datos del mensaje a enviar.
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               idRemitente:
 *                 type: integer
 *               idDestinatario:
 *                 type: integer
 *               asunto:
 *                 type: string
 *               mensaje:
 *                 type: string
 *     responses:
 *       200:
 *         description: Mensaje enviado!
 *       500:
 *         description: Error al enviar el mensaje!.
 */
router.post("/rest/enviarMensaje", enviarMensaje);

/**
 * @swagger
 * /rest/leerMensajes/{idUser}:
 *   get:
 *     summary: Trae los mensajes de un usuario
 *     parameters:
 *       - in: path
 *         name: idUser
 *         schema:
 *           type: integer
 *         required: true
 *         description: El id del usuario
 *     responses:
 *       200:
 *         description: Mensajes obtenidos correctamente.
 * /rest/getDrafts:
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
router.get("/rest/getDrafts", getDrafts);

/**
 * @swagger
 * /rest/postDraft:
 *   post:
 *     summary: Lee un mensaje.
 *     responses:
 *       200:
 *         description: Lee un mensaje
 * /rest/enviar:
 *   post:
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
router.post("/rest/postDraft", postDraft);
/**
 * @swagger
 * /rest/postDraft:
 *   post:
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
router.get("/rest/getDraftId/:id", getDraftsId);
/**
 * @swagger
 * /rest/postDraft:
 *   post:
 *     summary: Lee un mensaje.
 *     responses:
 *       200:
 *         description: Lee un mensaje
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               items:
 *                 type: object
 *                 properties:
 *                   idMensaje:
 *                     type: integer
 *                   idRemitente:
 *                     type: integer
 *                   idDestinatario:
 *                     type: integer
 *                   message:
 *                     type: string
 */
router.put("/rest/putDraft/:id", putDraft);
/**
 * @swagger
 * /rest/postDraft:
 *   post:
 *                   destinatario:
 *                     type: string
 *                   mensaje:
 *                     type: string
 *                   asunto:
 *                    type: string
 *                   mensaje:
 *                    type: string
 *                   respuesta:
 *                    type: string
 *       500:
 *         description: Error al obtener los mensajes.
 */
router.get("/rest/leerMensajes/:idUser", leerMensajes);

/**
 * @swagger
 * /rest/responderMensaje:
 *   post:
 *     summary: Responde a un mensaje.
 *     requestBody:
 *       description: Datos para responder el mensaje.
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               idMensaje:
 *                 type: integer
 *               respuesta:
 *                 type: string
 *     responses:
 *       200:
 *         description: Mensaje respondido!
 *       500:
 *         description: Error al enviar el mensaje!
 */
router.post("/rest/responderMensaje", responderMensaje);


router.delete("/rest/deleteDraft/:id", deleteDraft);


router.get("/rest/leer", leerMensajes);



export default router;