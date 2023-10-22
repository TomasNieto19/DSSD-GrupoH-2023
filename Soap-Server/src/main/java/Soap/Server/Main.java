package Soap.Server;

import javax.xml.ws.Endpoint;

import services.RecipeBookServiceImpl;
import services.RecipeHasReportServiceImpl;

public class Main {
    public static void main(String[] args) {

        String url = "http://localhost:9001/ws-grupoH-app/RecipeHasReportServiceImpl";

        //Endpoint.publish(url, new EmpleadoServiceImpl());
        Endpoint.publish(url, new RecipeHasReportServiceImpl());

        System.out.println("\n\nServicio iniciado en: " + url + "?wsdl");

    }
}