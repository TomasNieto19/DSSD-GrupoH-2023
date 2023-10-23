from flask_swagger_ui import get_swaggerui_blueprint
from suds.client import Client as SudsClient
from flask import Flask, request, jsonify


# Se crean el los clientes de los servicios SOAP

RecipeHasReport_client = SudsClient(url='http://localhost:9000/ws-grupoH-app/RecipeHasReportServiceImpl?wsdl', cache=None)

RecipeBook_client = SudsClient(url='http://localhost:9000/ws-grupoH-app/RecipeBookServiceImpl?wsdl', cache=None)

# Se crea la aplicación Flask
app = Flask(__name__)

# Se crea la ruta /swagger y se le asigna swagger.json
swaggerui_blueprint = get_swaggerui_blueprint('/swagger','/static/swagger.json')

app.register_blueprint(swaggerui_blueprint)


############################################################


@app.route('/soap/agregarDenuncia', methods=['POST'])
def agregarDenuncia():
    
    data = request.get_json()

    id_recipe = data.get('id_recipe')

    reason = data.get('reason')

    is_reason = data.get('is_reason')

    result = RecipeHasReport_client.service.addOrUpdateReport(id_recipe,reason,is_reason);
    
    return jsonify ({'mensaje': result})


@app.route('/soap/traerTodasDenuncias', methods=['GET'])
def traerTodasDenuncias():

    result = RecipeHasReport_client.service.getAll()

    serializable_result = [{'id_report': r.id_report, 'id_recipe': r.id_recipe,'reason': r.reason, 'is_reason': r._reason}for r in result]

    return jsonify(serializable_result)


@app.route('/soap/ignorarDenuncia/<int:id_report>', methods=['PUT'])
def ignorarDenuncia(id_report):

    result = RecipeHasReport_client.service.ignoreRecipeReport(id_report)

    return jsonify(result)


@app.route('/soap/eliminarReceta/<int:id_recipe>', methods=['DELETE'])
def eliminarReceta(id_recipe):

    result = RecipeHasReport_client.service.deleteRecipeReport(id_recipe)

    return jsonify(result)


############################################################



@app.route('/soap/agregarRecetario',  methods=['POST'])
def agregarRecetario():

    data = request.get_json()
    
    name = data.get('name')

    iduser = data.get('iduser')

    result = RecipeBook_client.service.addRecipeBook(name,iduser);

    return jsonify({'mensaje': result}) 


@app.route('/soap/traerTodosRecetarios', methods=['GET'])
def traerTodosRecetarios():

    result = RecipeBook_client.service.getAllRecipeBook()

    serializable_result = [{'idRecipeBook': r.idRecipeBook, 'name': r.name, 'idUser': r.idUser} for r in result]

    return jsonify(serializable_result)


@app.route('/soap/traerRecetarioPorId/<int:idRecipeBook>', methods=['GET'])
def traerRecetarioPorId(idRecipeBook):
    # No necesitas usar request.get_json() para obtener el ID,
    # ya que Flask lo captura automáticamente de la URL como un argumento de función.

    result = RecipeBook_client.service.getRecipeBookById(idRecipeBook)

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

    result = RecipeBook_client.service.deleteRecipeBook(idRecipeBook)

    return jsonify({'mensaje': result}) 


@app.route('/soap/addRecipeInRecipeBook', methods=['POST'])
def addRecipeInRecipeBook():

    data = request.get_json()

    idRecipeBook = data.get('idRecipeBook')

    idRecipe = data.get('idRecipe')
    
    result = RecipeBook_client.service.addRecipeInRecipeBook(idRecipeBook,idRecipe);

    return jsonify({'mensaje': result}) 


@app.route('/soap/getRecipeInRecipeBookById/<int:idRecipeBook>', methods=['GET'])
def getRecipeInRecipeBookById(idRecipeBook):

    result = RecipeBook_client.service.getRecipeInRecipeBookById(idRecipeBook)
    
    serializable_result = []
    
    for item in result:
           serializable_result.append({
            'id_recipe_book': item.id_recipe_book,
            'id_recipe': item.id_recipe
           })
    
    return jsonify(serializable_result)

    
@app.route('/soap/deleteRecipefromRecipeBook/<int:idRecipeBook>&<int:idRecipe>', methods=['DELETE'])
def deleteRecipefromRecipeBook(idRecipeBook,idRecipe):

    result = RecipeBook_client.service.deleteRecipefromRecipeBook(idRecipeBook,idRecipe)

    return jsonify({'mensaje': result}) 


@app.route('/soap/userIsModerator/<int:idUser>', methods=['GET'])
def userIsModerator(idUser):

    result = RecipeBook_client.service.userIsModerator(idUser)

    return jsonify({'isModerator': result})



if __name__ == '__main__':
    print("\n\nFLASK APP EN 8085: http://localhost:8085/swagger" + "\n\n")
    app.run(port=8085)