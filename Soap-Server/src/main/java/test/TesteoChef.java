package test;

import dao.RecetarioChefDAO;
import dao.RecetasChefDao;
import dao.RecipeBookDao;
import dao.UsuarioChefDao;
import entities.RecetasChef;
import entities.RecipeBook;
import entities.Recipe_in_RecipeBook;
import entities.SeleccionDelChef;
import entities.UsuarioChef;

public class TesteoChef {

	public static void main(String[] args) {

		//Utilidades.agregarCincoRecetas();
		//Utilidades.agregarUsuario();

		
		System.out.println("Traigo todas las recetas: \n");
		System.out.println(RecetasChefDao.getInstance().getAllRecetasChef());

		
		System.out.println("\n\nTraigo receta por id:1 \n");
		System.out.println(RecetasChefDao.getInstance().getRecetaById(1));
		
		
		//System.out.println("Borro todas las recetas: \n");
		//RecetasChefDao.getInstance().deleteAllRecetasChef("Recetas_Chef");

		
		System.out.println("Borro receta por id:2 \n");
		System.out.println(RecetasChefDao.getInstance().deleteRecetaChef(2));
		
		
		System.out.println("\n\nTraigo todos los usuarios: \n");
		System.out.println(UsuarioChefDao.getInstance().getAllUsers());
		
		
		System.out.println("\n\nTraigo usuario por id: \n");
		System.out.println(UsuarioChefDao.getInstance().getUsersById(14));
		//no me deja borrar porque esta asociada a mas tablas
		// UsuarioChefDao.getInstance().deleteAllUsersChef("users"); 
		 
		
		System.out.println("\n\nBorro usuario por id: \n");
		System.out.println(UsuarioChefDao.getInstance().deleteUserChefbyId(15));
		
		
		/*
		String titulo = "Receta de Lomo de cerdo a la mostaza.\n";
		String descripcion = "El plato te presentamos consiste en una receta clásica que se elabora de manera rápida y sencilla.\n";
		int tiempoCoccion = 30;
		String ingredientes = "Ingrediente 1 " + "Ingrediente 2 " + "Ingrediente 3 " + "Ingrediente 4 \n";
		String pasos = "Paso 1 " + "Paso 2 " + "Paso 3 " + "Paso 4 \n";
		int idUsuario = 1;
		String fotos = "https://cdn0.recetasgratis.net/es/posts/4/7/9/lomo_de_cerdo_a_la_mostaza_76974_600.webp"+ "\n\n";
		RecetasChef recetasChefEnCasa1 = new RecetasChef(titulo, descripcion, tiempoCoccion, ingredientes, pasos,idUsuario,fotos);
		*/
		System.out.println("-----------------------------------------------------------------------------------------");
		System.out.println("add recetario id: \n");
		SeleccionDelChef seleccionDelChef = new SeleccionDelChef ("RECETA1",1,true);
		
		try {
			System.out.println(RecetarioChefDAO.getInstance().addOrUpdateSeleccionDelChef(seleccionDelChef));
		} catch (Exception e) {

			System.out.println(e.getMessage());		
			}
		System.out.println("Traigo recetario id: 3\n");
		System.out.println(RecetarioChefDAO.getInstance().getSeleccionDelChefById(3));
		
		
		System.out.println("Borro recetario id: 3\n");
		System.out.println(RecetarioChefDAO.getInstance().deleteSeleccionDelChef(3));
		
		
		System.out.println("Traigo todos los  recetarios: 3\n");
		System.out.println(RecetarioChefDAO.getInstance().getAll());
		
		
		
		
		
		}

}
