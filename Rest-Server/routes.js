import { deleteDraft } from "./Controllers/deleteDraft.js";
import { getDraftsId } from "./Controllers/getDraftId.js";
import { postDraft } from "./Controllers/postDraft.js";
import { getDrafts } from "./Controllers/getDrafts.js";
import { putDraft } from "./Controllers/putDraft.js";

import { responderMensaje } from "./Controllers/responderMensaje.js";
import { enviarMensaje } from "./Controllers/enviarMensaje.js";
import { leerMensajes } from "./Controllers/leerMensajes.js";

import express from "express";

const router = express.Router();


/**
 * @swagger
 * tags:
 *   name: Correo Interno
 *   description: Endpoints relacionados con el correo interno de mensajes (PUNTO 3)
*/


/**
 * @swagger
 * /rest/sendMessage:
 *   post:
 *     summary: Se envia un mensaje a otro usuario.
 *     tags: [Correo Interno]
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
router.post("/rest/sendMessage", enviarMensaje);

/**
 * @swagger
 * /rest/readMessage/{idUser}:
 *   get:
 *     summary: Trae los mensajes de un usuario
 *     tags: [Correo Interno] 
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
 *                   asunto:
 *                    type: string
 *                   mensaje:
 *                    type: string
 *                   respuesta:
 *                    type: string
 *       500:
 *         description: Error al obtener los mensajes.
 */
router.get("/rest/readMessage/:idUser", leerMensajes);

/**
 * @swagger
 * /rest/replyMessage:
 *   post:
 *     summary: Responde a un mensaje.
 *     tags: [Correo Interno] 
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
router.post("/rest/replyMessage", responderMensaje);


/**
 * @swagger
 * tags:
 *   name: Carga Masiva
 *   description: Endpoints relacionados con la carga masiva y borradores (PUNTO 4)
*/


/**
 * @swagger
 * /rest/getDrafts:
 *   get:
 *     summary: Obtiene todos los borradores.
 *     tags: [Carga Masiva]
 *     responses:
 *       200:
 *         description: Borradores obtenidos con éxito.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 // Aquí debes incluir las propiedades específicas de cada borrador, por ejemplo:
 *                 properties:
 *                   title:
 *                     type: string
 *                   content:
 *                     type: string
 *       500:
 *         description: Error al intentar obtener los borradores.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   description: Mensaje de error detallado.
 */
router.get("/rest/getDrafts", getDrafts);

/**
 * @swagger
 * /rest/postDraft:
 *   post:
 *     summary: Crea un nuevo borrador.
 *     tags: [Carga Masiva]
 *     requestBody:
 *       description: Datos del borrador a crear.
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *               description:
 *                 type: string
 *               category:
 *                 type: string
 *               preparation_time:
 *                 type: integer
 *               id_user:
 *                 type: integer
 *     responses:
 *       200:
 *         description: Borrador creado con éxito.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id_draft:
 *                   type: string
 *                   description: ID del borrador creado.
 *       500:
 *         description: Error al intentar crear el borrador.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   description: Mensaje de error detallado.
 */
router.post("/rest/postDraft", postDraft);

/**
 * @swagger
 * /rest/getDraftId/{id}:
 *   get:
 *     summary: Obtiene un borrador por su ID.
 *     tags: [Carga Masiva]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: ID del borrador a obtener.
 *     responses:
 *       200:
 *         description: Borrador obtenido con éxito.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 // Aquí debes incluir las propiedades específicas del borrador, por ejemplo:
 *                 properties:
 *                   title:
 *                     type: string
 *                   content:
 *                     type: string
 *       500:
 *         description: Error al intentar obtener el borrador.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   description: Mensaje de error detallado.
 */
router.get("/rest/getDraftId/:id", getDraftsId);

/**
 * @swagger
 * /rest/putDraft/{id}:
 *   put:
 *     summary: Actualiza un borrador por su ID.
 *     tags: [Carga Masiva]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: ID del borrador a actualizar.
 *       - in: body
 *         name: draft
 *         description: Datos del borrador a actualizar.
 *         required: true
 *         schema:
 *           type: object
 *           properties:
 *             title:
 *               type: string
 *             description:
 *               type: string
 *             category:
 *               type: string
 *             preparation_time:
 *               type: integer
 *             ingredients:
 *               type: string
 *             steps:
 *               type: string
 *             photos:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   url:
 *                    type: string
 *     responses:
 *       200:
 *         description: Borrador actualizado con éxito.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 result:
 *                   type: string
 *                   description: Resultado de la actualización del borrador.
 *       500:
 *         description: Error al intentar actualizar el borrador.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   description: Mensaje de error detallado.
 */
router.put("/rest/putDraft/:id", putDraft);

/**
 * @swagger
 * /rest/deleteDraft/{id}:
 *   delete:
 *     summary: Elimina un borrador por su ID.
 *     tags: [Carga Masiva]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: ID del borrador a eliminar.
 *     responses:
 *       200:
 *         description: Borrador eliminado con éxito.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 result:
 *                   type: string
 *                   description: Resultado de la eliminación del borrador.
 *       500:
 *         description: Error al intentar eliminar el borrador.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   description: Mensaje de error detallado.
 */
router.delete("/rest/deleteDraft/:id", deleteDraft);


export default router;