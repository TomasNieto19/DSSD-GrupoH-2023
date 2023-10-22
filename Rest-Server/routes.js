import express from "express";

import { getDrafts } from "./Controllers/getDrafts.js";
import { postDraft } from "./Controllers/postDraft.js";
import { getDraftsId } from "./Controllers/getDraftId.js";
import { putDraft } from "./Controllers/putDraft.js";
import { deleteDraft } from "./Controllers/deleteDraft.js";

import { enviarMensaje } from "./Controllers/enviarMensaje.js";
import { leerMensajes } from "./Controllers/recibirMensaje.js";


const router = express.Router();

/**
 * @swagger
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
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
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
 *                     type: string
 */
router.post("/rest/enviar", enviarMensaje);

/**
 * @swagger
 * /rest/leer:
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

router.delete("/rest/deleteDraft/:id", deleteDraft);


router.get("/rest/leer", leerMensajes);


export default router;