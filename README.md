# DSSD-GrupoH-2023
TP para la materia desarrollo de software en sistemas distribuidos.


### Compilar y levantar Servidor.
En la raiz de la carpeta Server, ejecutar:
- `mvn clean install`.
- Ingresar al ide y ejecutar la clase server dentro del package server.

### Compilar y levantar Cliente.
En la raiz de la carpeta Client, ejecutar:
- `dotnet build`.
- `dotnet run`.

### Levantar Kafka.
Descargar en: https://kafka.apache.org/downloads, luego en la raiz de la carpeta ejecutar:
- Primero el ZooKeeper `.\bin\windows\zookeeper-server-start.bat .\config\zookeeper.properties`
- Segundo el Server `.\bin\windows\kafka-server-start.bat .\config\server.properties`
- Despues, en la carpeta Kafka del proyecto ejecutar: `node index.js`
