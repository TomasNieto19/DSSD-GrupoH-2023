package test;

import dao.RecetaEnSeleccionDelChefDao;
import dao.RecetarioChefDAO;
import dao.RecetasChefDao;
import dao.RecipeBookDao;
import dao.UsuarioChefDao;
import entities.RecetaEnSeleccionDelChef;
import entities.RecetasChef;
import entities.RecipeBook;
import entities.Recipe_in_RecipeBook;
import entities.SeleccionDelChef;
import entities.UsuarioChef;

public class TesteoChef {

	public static void main(String[] args) {
		
		 //Utilidades.agregarUsuario();
		 //Utilidades.agregarCincoRecetas();
		 
		
		//-----------------RECETAS DEL CHEF-------------------------------------
		/*
		System.out.println("Traigo todas las recetas: \n");
		System.out.println(RecetasChefDao.getInstance().getAllRecetasChef());

		
		System.out.println("\n\nTraigo receta por id:1 \n");
		System.out.println(RecetasChefDao.getInstance().getRecetaById(1));
		
		
		//System.out.println("Borro todas las recetas: \n");
		//RecetasChefDao.getInstance().deleteAllRecetasChef("Recetas_Chef");

		
		System.out.println("Borro receta por id:2 \n");
		System.out.println(RecetasChefDao.getInstance().deleteRecetaChef(2));
		*/
		//--------------------USUARIOS CHEF---------------------------------------------------
		
		System.out.println("\n\nTraigo todos los usuarios: \n");
		System.out.println(UsuarioChefDao.getInstance().getAllUsers());
		
		/*
		System.out.println("\n\nTraigo usuario por id: \n");
		System.out.println(UsuarioChefDao.getInstance().getUsersById(14));
		//no me deja borrar porque esta asociada a mas tablas
		// UsuarioChefDao.getInstance().deleteAllUsersChef("users"); 
		 
		
		System.out.println("\n\nBorro usuario por id: \n");
		System.out.println(UsuarioChefDao.getInstance().deleteUserChefbyId(15));
		*/
		
		
		//---------------------RECETARIO SELECCION DEL CHEF---------------------------------------------------------
		
		System.out.println("-----------------------------------------------------------------------------------------");
		System.out.println("ADD RECETARIO SELECCION DEL CHEF: \n");
		SeleccionDelChef seleccionDelChef = new SeleccionDelChef ("RECETA Micaela ",4,false);
		
		try {
			System.out.println(RecetarioChefDAO.getInstance().addOrUpdateSeleccionDelChef(seleccionDelChef));
		} catch (Exception e) {

			System.out.println(e.getMessage());		
			}
		System.out.println("\nTraigo selelccion de chef id: 1\n");
		System.out.println(RecetarioChefDAO.getInstance().getSeleccionDelChefById(1));
		
		
		System.out.println("\nBorro selelccion de chef id: 3\n");
		System.out.println(RecetarioChefDAO.getInstance().deleteSeleccionDelChef(3));
		
		
		System.out.println("\nTraigo todos los  selelccion de chef:  \n");
		System.out.println(RecetarioChefDAO.getInstance().getAll());
		
		//------------------------RecetaEnSeleccionDelChefDao--------receta en seleccion de receta----------------------------------
		/*
		System.out.println("-----------------------------------------------------------------------------------------");
		System.out.println("add Receta En Seleccion Del Chef: \n");
		RecetaEnSeleccionDelChef recetaEnSeleccionDelChef = new RecetaEnSeleccionDelChef(1,1);
		
		try {
			System.out.println(RecetaEnSeleccionDelChefDao.getInstance().addRecetaEnSeleccionDelChef(recetaEnSeleccionDelChef));
		} catch (Exception e) {
			System.out.println(e.getMessage());
		}
		*/
		System.out.println("\nTraigo Receta En Seleccion Del Chef id: 6\n");
		System.out.println(RecetaEnSeleccionDelChefDao.getInstance().getRecetaEnSeleccionDelChefById(6));
		
		
		System.out.println("\nBorro Receta En Seleccion Del Chef id: 8\n");
		System.out.println(RecetaEnSeleccionDelChefDao.getInstance().deleteRecetaEnSeleccionDelChef(8));
		
		
		System.out.println("\nTraigo todos las Receta En Seleccion Del Chef:  \n");
		System.out.println(RecetaEnSeleccionDelChefDao.getInstance().getAllRecetaEnSeleccionDelChef());
		
		
		System.out.println("\ntraerRecetaPorIdUser");
		System.out.println(RecetarioChefDAO.getInstance().traerSeleccionDelChefPorIdUsuario(8));
		
	 
		System.out.println("\nComprueba cantidad de recetas USUARIO 4");
		System.out.println(RecetarioChefDAO.getInstance().traerSeleccionDelChefPorIdUsuario5(4));
		
		System.out.println("\nhacer a todos falsos");
		RecetarioChefDAO.getInstance().habilitarTodosParaVisibleEnBaseDeDatos();
		System.out.println(RecetarioChefDAO.getInstance().getAll());
		
		System.out.println("\nhacer visible solo los que tenga numero 3");
		RecetarioChefDAO.getInstance().habilitarVisiblePorIdUsuario(3);
		System.out.println(RecetarioChefDAO.getInstance().getAll());
		
		System.out.println("\nhacer visible los registros de micaela ");
		RecetarioChefDAO.getInstance().habilitarVisiblePorIdUsuarioMayor5(4);
		System.out.println(RecetarioChefDAO.getInstance().getAll());
		
		
		//RecetarioChefDAO.getInstance().generarYGuardarPDF(seleccionDelChef, RecetasChefDao.getInstance().getAllRecetasChef());
		
		
		System.out.println("trigo una lista de recetas chef por usuario ejemplo: 4 ");
		
		System.out.println(RecetasChefDao.getInstance().getRecetasChefByUserId(4));
		
		RecetarioChefDAO.getInstance().generarYGuardarPDF(seleccionDelChef, RecetasChefDao.getInstance().getRecetasChefByUserId(4));
		
		
	}
}
