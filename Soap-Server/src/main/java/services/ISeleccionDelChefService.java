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
