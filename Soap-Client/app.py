from flask_swagger_ui import get_swaggerui_blueprint
from suds.client import Client as SudsClient
from flask import Flask, request, jsonify


# Se crea el cliente SOAP
client = SudsClient(url='http://localhost:9000/ws-grupoH-app/EmpleadoServiceImpl?wsdl', cache=None)

# Se crea la aplicación Flask
app = Flask(__name__)

# Se crea la ruta /swagger y se le asigna swagger.json
swaggerui_blueprint = get_swaggerui_blueprint('/swagger','/static/swagger.json')

app.register_blueprint(swaggerui_blueprint)

# Endpoint para el método GET
@app.route('/soap/saludo', methods=['GET'])
def obtener_saludo():
    return jsonify({'mensaje': '¡Hola, mundo!'})


# Endpoint para el método POST
@app.route('/soap/saludar', methods=['POST'])
def saludar():

    data = request.get_json()

    nombre = data.get('nombre')

    result = client.service.postEmpleado(nombre);

    return jsonify({'mensaje': result})    


if __name__ == '__main__':
    print("\n\nFLASK APP EN 8085: http://localhost:8085/swagger" + "\n\n")
    app.run(port=8085)