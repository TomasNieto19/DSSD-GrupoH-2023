package services;

import java.util.List;

import javax.jws.WebMethod;
import javax.jws.WebParam;
import javax.jws.WebResult;
import javax.jws.WebService;
import javax.jws.soap.SOAPBinding;
import javax.jws.soap.SOAPBinding.Use;
import javax.persistence.EntityManager;

import dao.JPAUtil;
import entities.RecetaEnSeleccionDelChef;
import entities.RecetasChef;
import entities.SeleccionDelChef;

@WebService
@SOAPBinding(style = SOAPBinding.Style.DOCUMENT, use = Use.LITERAL)
public interface IRecetaChef {
	
	//otra clase


	 

	@WebMethod(operationName = "addRecetasChef") //nombre de la operacion
	@WebResult(name = "ResultadoOperacion") //nombre de donde nos va a dejar el resultado
	String addRecetasChef(@WebParam(name = "titulo") String title, @WebParam(name = "descripcion") String description,
			@WebParam(name = "tiempoCoccion") int cookTime,@WebParam(name = "ingredientes")  String ingredients,
			@WebParam(name = "pasos") String steps,@WebParam(name = "id_user") Integer users,
			@WebParam(name = "foto") String photoUrl);


	@WebMethod(operationName = "getAllRecetasChef") //nombre de la operacion
	@WebResult(name = "ResultadoOperacion") //nombre de donde nos va a dejar el resultado
	List<RecetasChef> getAllRecetasChef();//me devuelve una lista de recetarios

	@WebMethod(operationName = "getRecetasChefByUserId") //nombre de la operacion
	@WebResult(name = "ResultadoOperacion") //nombre de donde nos va a dejar el resultado
	RecetasChef getRecetasChefByUserId( @WebParam(name = "id_user") int users);//devuelve un recetario

	@WebMethod(operationName = "deleteAllRecetasChef") //nombre de la operacion
	@WebResult(name = "ResultadoOperacion") //nombre de donde nos va a dejar el resultado
	String deleteAllRecetasChef(@WebParam(name = "recetas_chef") String tabla);

	@WebMethod(operationName = "getRecetaById") //nombre de la operacion solo id de la receta$$$$$$$
	@WebResult(name = "ResultadoOperacion") //nombre de donde nos va a dejar el resultado
	RecetasChef getRecetaById( @WebParam(name = "id") int idRecipe);//devuelve un recetario

	@WebMethod(operationName = "deleteRecetaChef") //nombre de la operacion
	@WebResult(name = "ResultadoOperacion") //nombre de donde nos va a dejar el resultado
	String deleteRecetaChef(@WebParam(name = "idRecipe") int idRecipe);



}
