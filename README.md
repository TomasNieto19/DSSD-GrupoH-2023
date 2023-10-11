# DSSD-GrupoH-2023
TP para la materia desarrollo de software en sistemas distribuidos.

---

## Compilar y levantar Servidor de GRPC.
En la raiz de la carpeta Server, ejecutar:
- `mvn clean install`.
- Ingresar al ide y ejecutar la clase server dentro del package server.

---

## Compilar y levantar Cliente de GRPC.
En la raiz de la carpeta Client, ejecutar:
- `dotnet build`.
- `dotnet run`.

---

## Levantar Server de Kafka.
Descargar en: https://kafka.apache.org/downloads, luego en la raiz de la carpeta ejecutar:
- Primero el ZooKeeper `.\bin\windows\zookeeper-server-start.bat .\config\zookeeper.properties`
- Segundo el Server `.\bin\windows\kafka-server-start.bat .\config\server.properties`
- Despues, en la carpeta Kafka del proyecto ejecutar: `node index.js`

---

## Requerimientos para levantar el Cliente de SOAP en Python

### Tener instalado:

 - Python 3.1x -> (https://www.python.org/downloads/)
 
 - `pip install Flask==3.0.0`
 - `pip install flask-swagger-ui==4.11.1`
 - `pip install suds-py3==1.4.5.0`
 - `pip install Werkzeug==3.0.0`

### Levantar el servidor previamente y ejecutar: `python app.py`

---
