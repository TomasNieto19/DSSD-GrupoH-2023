from flask_swagger_ui import get_swaggerui_blueprint
from suds.client import Client as SudsClient
from flask import Flask, request, jsonify


# Se crea el cliente SOAP
client = SudsClient(url='http://localhost:9001/ws-grupoH-app/RecipeHasReportServiceImpl?wsdl', cache=None)

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

@app.route('/soap/agregarDenuncia', methods=['POST'])
def agregarDenuncia():
    
    data = request.get_json()
    id_recipe = data.get('id_recipe')
    reason = data.get('reason')
    is_reason = data.get('is_reason')

    result = client.service.addOrUpdateReport(id_recipe,reason,is_reason);
    return jsonify ({'mensaje': result})

@app.route('/soap/traerTodasDenuncias', methods=['GET'])
def traerTodasDenuncias():
    result= client.service.getAll()
    serializable_result = [{'id_report': r.id_report, 'id_recipe': r.id_recipe,'reason': r.reason, 'is_reason': r._reason}for r in result]
    return jsonify(serializable_result)

@app.route('/soap/ignorarDenuncia/<int:id_report>', methods=['PUT'])
def ignorarDenuncia(id_report):
    result = client.service.ignoreRecipeReport(id_report)
    return jsonify(result)

@app.route('/soap/eliminarReceta/<int:id_recipe>', methods=['DELETE'])
def eliminarReceta(id_recipe):
    result= client.service.deleteRecipeReport(id_recipe)
    return jsonify(result)

if __name__ == '__main__':
    print("\n\nFLASK APP EN 8085: http://localhost:8085/swagger" + "\n\n")
    app.run(port=8085)