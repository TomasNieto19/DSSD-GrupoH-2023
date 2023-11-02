package services;

import java.util.List;

import javax.jws.WebMethod;
import javax.jws.WebParam;
import javax.jws.WebResult;
import javax.jws.WebService;
import javax.jws.soap.SOAPBinding;
import javax.jws.soap.SOAPBinding.Use;

import entities.RecetaEnSeleccionDelChef;
import entities.RecipeBook;
import entities.Recipe_in_RecipeBook;
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

}
