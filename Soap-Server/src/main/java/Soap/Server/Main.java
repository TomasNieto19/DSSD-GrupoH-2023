package Soap.Server;

import javax.xml.ws.Endpoint;

public class Main {
    public static void main(String[] args) {

        String url = "http://localhost:9000/ws-grupoH-app/EmpleadoServiceImpl";

        Endpoint.publish(url, new EmpleadoServiceImpl());

        System.out.println("\n\nServicio iniciado en: " + url + "?wsdl");

    }
}