package Soap.Server;

import javax.xml.ws.Endpoint;

import services.RecipeBookServiceImpl;
import services.RecipeHasReportServiceImpl;

public class Main {
    public static void main(String[] args) {


        String url = "http://localhost:9000/ws-grupoH-app/RecipeBookServiceImpl";       
        Endpoint.publish(url, new RecipeBookServiceImpl());
        System.out.println("\n\nServicio iniciado en: " + url + "?wsdl");
        
        String urlR1 = "http://localhost:9000/ws-grupoH-app/RecetasChefImpl";        
        Endpoint.publish(urlR1, new RecipeBookServiceImpl());  
        System.out.println("\n\nServicio iniciado en: " + urlR1 + "?wsdl");
        
        String urlR2 = "http://localhost:9000/ws-grupoH-app/SeleccionDelChefServiceImpl";        
        Endpoint.publish(urlR2, new RecipeBookServiceImpl());  
        System.out.println("\n\nServicio iniciado en: " + urlR2 + "?wsdl");	
        
        String urlR3 = "http://localhost:9000/ws-grupoH-app/RecetaEnSeleccionDelChefImpl";        
        Endpoint.publish(urlR3, new RecipeBookServiceImpl());  
        System.out.println("\n\nServicio iniciado en: " + urlR3 + "?wsdl");

        
       /*
        String url1 = "http://localhost:9000/ws-grupoH-app/RecipeHasReportServiceImpl";
        Endpoint.publish(url1, new RecipeHasReportServiceImpl());
        System.out.println("\n\nServicio iniciado en: " + url1 + "?wsdl");
        
        
        String url2 = "http://localhost:9000/ws-grupoH-app/RecipeBookServiceImpl";        
        Endpoint.publish(url2, new RecipeBookServiceImpl());  
        System.out.println("\n\nServicio iniciado en: " + url2 + "?wsdl");
        
         
	*/

    }
}