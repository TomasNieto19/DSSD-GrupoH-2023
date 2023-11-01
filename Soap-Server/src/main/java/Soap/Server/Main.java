package Soap.Server;

import javax.xml.ws.Endpoint;

import services.RecipeBookServiceImpl;

public class Main {
    public static void main(String[] args) {

        String url = "http://localhost:9000/ws-grupoH-app/RecipeBookServiceImpl";
        
        Endpoint.publish(url, new RecipeBookServiceImpl());

        System.out.println("\n\nServicio iniciado en: " + url + "?wsdl");

    }
}