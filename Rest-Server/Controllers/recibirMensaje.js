// Función para leer los mensajes
export async function leerMensajes() {
    try {
        // Realiza una solicitud GET al servidor para obtener los mensajes
        const response = await fetch('/recibir-mensajes');
        if (response.status === 200) {
            // Los mensajes se obtuvieron con éxito
            const mensajes = await response.json();
            return mensajes;
        } else {
            // Manejar errores, como un fallo en el servidor
            console.error('Error al obtener mensajes');
            return [];
        }
    } catch (error) {
        // Manejar errores de red u otros errores
        console.error('Error al obtener mensajes:', error);
        return [];
    }
}

