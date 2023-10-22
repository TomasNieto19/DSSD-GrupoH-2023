package services;

import java.util.List;

import javax.jws.WebMethod;
import javax.jws.WebParam;
import javax.jws.WebResult;
import javax.jws.WebService;
import javax.jws.soap.SOAPBinding;
import javax.jws.soap.SOAPBinding.Use;

import entities.RecipeBook;
import entities.Recipe_in_RecipeBook;

@WebService
@SOAPBinding(style = SOAPBinding.Style.DOCUMENT, use = Use.LITERAL)
public interface IRecipeBookService {
	
	@WebMethod(operationName = "addRecipeBook") //nombre de la operacion
    @WebResult(name = "ResultadoOperacion") //nombre de donde nos va a dejar el resultado
	String addRecipeBook(@WebParam(name = "name") String name, @WebParam(name = "iduser") int iduser);
	
	@WebMethod(operationName = "getAllRecipeBook") //nombre de la operacion
    @WebResult(name = "ResultadoOperacion") //nombre de donde nos va a dejar el resultado
	List<RecipeBook> getAllRecipeBook();//me devuelve una lista de recetarios
	
	@WebMethod(operationName = "getRecipeBookById") //nombre de la operacion
    @WebResult(name = "ResultadoOperacion") //nombre de donde nos va a dejar el resultado
	RecipeBook getRecipeBookById( @WebParam(name = "idRecipeBook") int idRecipeBook);//devuelve un recetario
	
	@WebMethod(operationName = "deleteRecipeBook") //nombre de la operacion
    @WebResult(name = "ResultadoOperacion") //nombre de donde nos va a dejar el resultado
	String deleteRecipeBook(@WebParam(name = "idRecipeBook") int idRecipeBook);
	
	// ----------------Recipe_in_RecipeBook----------------
	
	@WebMethod(operationName = "addRecipeInRecipeBook") //nombre de la operacion
    @WebResult(name = "ResultadoOperacion") //nombre de donde nos va a dejar el resultado
	String addRecipeInRecipeBook(@WebParam(name = "id_recipe_book") int id_recipe_book, @WebParam(name = "id_recipe") int id_recipe);
	
	@WebMethod(operationName = "getRecipeInRecipeBookById") //nombre de la operacion
    @WebResult(name = "ResultadoOperacion") //nombre de donde nos va a dejar el resultado
	List<Recipe_in_RecipeBook> getRecipeInRecipeBookById(@WebParam(name = "id_recipe_book") int id_recipe_book);//pongo el id recetario y me muestra las recetas
	
	@WebMethod(operationName = "deleteRecipefromRecipeBook") //nombre de la operacion
    @WebResult(name = "ResultadoOperacion") //nombre de donde nos va a dejar el resultado
	String deleteRecipefromRecipeBook(@WebParam(name = "id_recipe_book") int id_recipe_book, @WebParam(name = "id_recipe") int id_recipe);
}
