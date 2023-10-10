package Soap.Server;

import javax.jws.WebService;

@WebService(endpointInterface = "Soap.Server.EmpleadoService")//tome los metodos desde aca.
public class EmpleadoServiceImpl implements EmpleadoService {

    @Override
    public String getEmpleadoById(int idEmpleado) {
        String res = "";
        if (idEmpleado == 10) {
            res = "Se encontro";
        } else {
            res = "Error";
        }
        return res;
    }

    @Override
    public String postEmpleado(String nombreEmpleado) {
        return "Mediante un POST llega el nombre: " + nombreEmpleado;
    }

}
