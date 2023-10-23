package services;

import java.util.List;

import javax.jws.WebMethod;
import javax.jws.WebParam;
import javax.jws.WebResult;
import javax.jws.WebService;
import javax.jws.soap.SOAPBinding;
import javax.jws.soap.SOAPBinding.Use;

import entities.Recipe_has_report;

@WebService
@SOAPBinding(style = SOAPBinding.Style.DOCUMENT, use = Use.LITERAL)
public interface IRecipeHasReportService {
	@WebMethod(operationName = "addOrUpdateReport") 
    @WebResult(name = "ResultadoOperacion")
	String addOrUpdateReport(@WebParam(name = "id_recipe") int id_recipe,@WebParam (name = "reason") String reason, @WebParam (name = "is_reason") boolean is_reason);
	
	@WebMethod(operationName = "getAll") 
    @WebResult(name = "ResultadoOperacion")
	List<Recipe_has_report> getAll();
	
	@WebMethod(operationName = "ignoreRecipeReport") 
    @WebResult(name = "ResultadoOperacion")
	String ignoreRecipeReport(@WebParam(name = "id_report") int id_report);
	
	@WebMethod(operationName = "deleteRecipeReport") 
    @WebResult(name = "ResultadoOperacion")
	String deleteRecipeReport(@WebParam(name = "id_recipe")int id_recipe);
	
}
