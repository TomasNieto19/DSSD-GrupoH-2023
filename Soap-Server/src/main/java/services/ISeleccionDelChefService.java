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
public interface ISeleccionDelChefService {


@WebMethod(operationName = "addSeleccionDelChef") //nombre de la operacion
@WebResult(name = "ResultadoOperacion") //nombre de donde nos va a dejar el resultado
String addSeleccionDelChef(@WebParam(name = "nombre") String name, @WebParam(name = "idUsuario") int iduser,@WebParam(name = "visibleComunidad") boolean visibleComunidad);

@WebMethod(operationName = "getAllSeleccionDelChef") //nombre de la operacion
@WebResult(name = "ResultadoOperacion") //nombre de donde nos va a dejar el resultado
List<SeleccionDelChef> getAllSeleccionDelChef();//me devuelve una lista de recetarios

@WebMethod(operationName = "getSeleccionDelChefById") //nombre de la operacion
@WebResult(name = "ResultadoOperacion") //nombre de donde nos va a dejar el resultado
SeleccionDelChef getSeleccionDelChefById( @WebParam(name = "id") int idSelecChef);//devuelve un recetario

@WebMethod(operationName = "deleteSeleccionDelChef") //nombre de la operacion
@WebResult(name = "ResultadoOperacion") //nombre de donde nos va a dejar el resultado
String deleteSeleccionDelChef(@WebParam(name = "idRecipeBook") int idSelecChef);

 
//otra clase


@WebMethod(operationName = "addRecetaEnSeleccionDelChef") //nombre de la operacion
@WebResult(name = "ResultadoOperacion") //nombre de donde nos va a dejar el resultado
String addRecetaEnSeleccionDelChef(@WebParam(name = "idRecetario") int idRecetario, @WebParam(name = "idReceta") int idReceta);


@WebMethod(operationName = "getAllRecetaEnSeleccionDelChef") //nombre de la operacion
@WebResult(name = "ResultadoOperacion") //nombre de donde nos va a dejar el resultado
List<RecetaEnSeleccionDelChef> getAllRecetaEnSeleccionDelChef();//me devuelve una lista de recetarios

@WebMethod(operationName = "getRecetaEnSeleccionDelChefById") //nombre de la operacion
@WebResult(name = "ResultadoOperacion") //nombre de donde nos va a dejar el resultado
RecetaEnSeleccionDelChef getRecetaEnSeleccionDelChefById( @WebParam(name = "id") int id);//devuelve un recetario

@WebMethod(operationName = "deleteRecetaEnSeleccionDelChef") //nombre de la operacion
@WebResult(name = "ResultadoOperacion") //nombre de donde nos va a dejar el resultado
String deleteRecetaEnSeleccionDelChef(@WebParam(name = "idRecetario") int idRecetario);


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


//Recetario Chef Dao

@WebMethod(operationName = "addOrUpdateSeleccionDelChef")
@WebResult(name = "ResultadoOperacion")

public static SeleccionDelChef addOrUpdateSeleccionDelChef(@WebParam(name = "seleccionDelChef") SeleccionDelChef seleccionDelChef) throws Exception {
	EntityManager em = JPAUtil.getEMF().createEntityManager();

	SeleccionDelChef SeleccionDelChefAdd = null;

	try {
		em.getTransaction().begin();
		SeleccionDelChefAdd = em.merge(seleccionDelChef);
		em.getTransaction().commit();

	} catch (Exception e) {

		throw new Exception("Error al persistir SeleccionDelChef: ");

	} finally {

		em.close();
	}

	return SeleccionDelChefAdd;


}
@WebMethod(operationName = "getAll") //nombre de la operacion
@WebResult(name = "ResultadoOperacion") //nombre de donde nos va a dejar el resultado
List<SeleccionDelChef> getAll();//me devuelve una lista de recetarios

}
