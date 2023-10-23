package Soap.Server;

import javax.xml.ws.Endpoint;

import services.RecipeBookServiceImpl;
import services.RecipeHasReportServiceImpl;

public class Main {
    public static void main(String[] args) {

        String url1 = "http://localhost:9000/ws-grupoH-app/RecipeHasReportServiceImpl";
        
        String url2 = "http://localhost:9000/ws-grupoH-app/RecipeBookServiceImpl";

        Endpoint.publish(url1, new RecipeHasReportServiceImpl());
        
        Endpoint.publish(url2, new RecipeBookServiceImpl());
        
        System.out.println("\n\nServicio iniciado en: " + url1 + "?wsdl");
        
        System.out.println("\n\nServicio iniciado en: " + url2 + "?wsdl");

    }
}