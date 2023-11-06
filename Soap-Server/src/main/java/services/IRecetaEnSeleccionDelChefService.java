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
public interface IRecetaEnSeleccionDelChefService {

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



}
