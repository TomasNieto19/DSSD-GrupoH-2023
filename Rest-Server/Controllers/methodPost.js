export const methodPost = async (req, res) => {

    const mensaje = req.body.message;
    const express = require('express');
  const app = express();
  
  app.use(express.json());
  
  const mensajes = [];
  
  // Ruta para enviar un mensaje
  app.post('/enviar-mensaje', (req, res) => {
      const mensaje = req.body.mensaje;
      mensajes.push(mensaje);
      res.json({ message: 'Mensaje enviado exitosamente' });
  });
  
  // Ruta para recibir mensajes
  app.get('/recibir-mensajes', (req, res) => {
      res.json({ mensajes });
  });
  
    return res.json({ message: `METODO POST! ${mensaje}` });
  
    
  };
  