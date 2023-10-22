package Soap.Server;

import javax.jws.WebMethod;
import javax.jws.WebParam;
import javax.jws.WebResult;
import javax.jws.WebService;
import javax.jws.soap.SOAPBinding;
import javax.jws.soap.SOAPBinding.Use;

@WebService
@SOAPBinding(style = SOAPBinding.Style.DOCUMENT, use = Use.LITERAL)
public interface EmpleadoService {

    @WebMethod(operationName = "getEmpleadoById") //nombre de la operacion
    @WebResult(name = "ResultadoOperacion") //nombre de donde nos va a dejar el resultado
    String getEmpleadoById(@WebParam(name = "idEmpleado") int idEmpleado); // param obtenido de la web

    @WebMethod(operationName = "postEmpleado")
    @WebResult(name = "ResultadoOperacion")
	String postEmpleado(@WebParam(name = "nombreEmpleado") String nombreEmpleado);
    
    
}