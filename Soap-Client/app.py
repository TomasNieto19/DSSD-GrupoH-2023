from flask_swagger_ui import get_swaggerui_blueprint
from suds.client import Client as SudsClient
from flask import Flask, request, jsonify


# Se crea el cliente SOAP
client = SudsClient(url='http://localhost:9000/ws-grupoH-app/RecipeBookServiceImpl?wsdl', cache=None)

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

############################################################
@app.route('/soap/agregarRecetario',  methods=['POST'])
def agregarRecetario():

    data = request.get_json()
    
    name = data.get('name')

    iduser = data.get('iduser')

    result = client.service.addRecipeBook(name,iduser);

    return jsonify({'mensaje': result}) 

@app.route('/soap/traerTodosRecetarios', methods=['GET'])
def traerTodosRecetarios():

    result = client.service.getAllRecipeBook()

    serializable_result = [{'idRecipeBook': r.idRecipeBook, 'name': r.name, 'idUser': r.idUser} for r in result]

    return jsonify(serializable_result)

@app.route('/soap/traerRecetarioPorId/<int:idRecipeBook>', methods=['GET'])
def traerRecetarioPorId(idRecipeBook):
    # No necesitas usar request.get_json() para obtener el ID,
    # ya que Flask lo captura automáticamente de la URL como un argumento de función.

    result = client.service.getRecipeBookById(idRecipeBook)

    if result:
        #me serializa como quiero el response body ya que en java me devuelve un objeto
        #yo tengo una tupla=conjunto de items
        
        serializable_result = {
            'idRecipeBook': next((item[1] for item in result if item[0] == 'idRecipeBook'), None),
            'idUser': next((item[1] for item in result if item[0] == 'idUser'), None),
            'name': next((item[1] for item in result if item[0] == 'name'), None)
        }
    
    return jsonify(serializable_result)
@app.route('/soap/deleteRecipeBook/<int:idRecipeBook>', methods=['DELETE'])
def deleteRecipeBook(idRecipeBook):
    result = client.service.deleteRecipeBook(idRecipeBook)
    return jsonify(result)

@app.route('/soap/addRecipeInRecipeBook', methods=['POST'])
def addRecipeInRecipeBook():

    data = request.get_json()

    idRecipeBook = data.get('idRecipeBook')

    idRecipe = data.get('idRecipe')
    
    result = client.service.addRecipeInRecipeBook(idRecipeBook,idRecipe);

    return jsonify({'mensaje': result}) 

@app.route('/soap/getRecipeInRecipeBookById/<int:idRecipeBook>', methods=['GET'])
def getRecipeInRecipeBookById(idRecipeBook):

    result = client.service.getRecipeInRecipeBookById(idRecipeBook)
    
    serializable_result = []
    
    for item in result:
           serializable_result.append({
            'id_recipe_book': item.id_recipe_book,
            'id_recipe': item.id_recipe
           })
    
    return jsonify(serializable_result)

    
@app.route('/soap/deleteRecipefromRecipeBook/<int:idRecipeBook>&<int:idRecipe>', methods=['DELETE'])
def deleteRecipefromRecipeBook(idRecipeBook,idRecipe):

    result= client.service.deleteRecipefromRecipeBook(idRecipeBook,idRecipe)

    return jsonify(result)

if __name__ == '__main__':
    print("\n\nFLASK APP EN 8085: http://localhost:8085/swagger" + "\n\n")
    app.run(port=8085)