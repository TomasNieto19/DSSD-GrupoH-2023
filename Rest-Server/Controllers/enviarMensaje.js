// Función para enviar un mensaje
export function enviarMensaje(destinatario, asunto, mensaje) {
    // Construye un objeto que contiene los datos del mensaje
    const mensajeData = {
        destinatario,
        asunto,
        mensaje,
    };

    // Realiza una solicitud POST al servidor para enviar el mensaje
    fetch('/enviar-mensaje', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(mensajeData),
    })
    .then(response => {
        if (response.status === 200) {
            // El mensaje se envió con éxito
            console.log('Mensaje enviado exitosamente');
            // Puedes mostrar un mensaje de éxito al usuario en la interfaz
            return 'Mensaje enviado exitosamente';
        } else {
            // Manejar errores, como un fallo en el servidor
            console.error('Error al enviar el mensaje');
            return 'Error al enviar el mensaje';
        }
    })
    .catch(error => {
        // Manejar errores de red u otros errores
        console.error('Error al enviar el mensaje:', error);
        return 'Error al enviar el mensaje';
    });
}
