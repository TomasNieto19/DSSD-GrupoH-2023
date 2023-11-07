package test;

import dao.RecetarioChefDAO;
import dao.RecetaEnSeleccionDelChefDao;
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
		
		System.out.println("\nA)- Creo recetario Publico.");
		//PRIMERO AGREGO  3 USUARIOS Y 5 RECETAS EN LA BASE DE DATOS
		
		//Utilidades.agregarUsuario();
		//Utilidades.agregarCincoRecetas();
		 
		/*-------------IMPRIMO TODAS LAS RECETAS-Y USUARIOS---------------------
		System.out.println("\nTraigo todas las recetas: \n");
		System.out.println(RecetasChefDao.getInstance().getAllRecetasChef());

		System.out.println("\n\nTraigo todos los usuarios: \n");
		System.out.println(UsuarioChefDao.getInstance().getAllUsers());
		
		*/
		System.out.println("\nB)- Modificacion de perfil de usuario.");
		//---------------------RECETARIO SELECCION DEL CHEF---------------------
		System.out.println("----------------------------------------------------------------------------------");
		System.out.println("ADD RECETARIO SELECCION DEL CHEF: \n");//micaela es el usuario numero 4
		SeleccionDelChef seleccionDelChef = new SeleccionDelChef ( "RECETA MICAELA ", 4 , false );
		
		try {
			System.out.println(RecetarioChefDAO.getInstance().addOrUpdateSeleccionDelChef(seleccionDelChef));
		} catch (Exception e) {

			System.out.println(e.getMessage());		
			}
		
		//Hago visible en la tabla solo si tiene minimo 5 recetas del mismo usuario
		
		System.out.println("\nC)- Ingreso a la seleccion chef.");
		System.out.println("\nHacer visible los registros del usuario " + seleccionDelChef.getIdUser() + " solo si minimo tiene 5 recetas." );
		RecetarioChefDAO.getInstance().habilitarVisiblePorIdUsuarioMayor5(seleccionDelChef.getIdUser());
		System.out.println(RecetarioChefDAO.getInstance().getAll());//imprimo una lista de todas las recetas
		
		//Traigo todas las recetas la tabla seleccion del chef del mismo usuario:
		
		System.out.println("\nTraigo recetario la tabla seleccion del chef del mismo usuario: " + seleccionDelChef.getIdUser());
		System.out.println(RecetarioChefDAO.getInstance().traerSeleccionDelChefPorIdUsuario(seleccionDelChef.getIdUser()));
		

		System.out.println("\nTraigo todas las recetas de un usuario en particular, usuario: " + seleccionDelChef.getIdUser());
		System.out.println(RecetasChefDao.getInstance().getRecetasChefByUserId(seleccionDelChef.getIdUser()));
		
		System.out.println("\nD,E)- Descarga de seleccion chef y generacion del pdf.");
		//Genero y guardo un pdf de recetas expecificas de un usuario
		System.out.println("\nGenero y guardo PDF de recetas Seleccion_del_Chef de un usuario en expecifico.");
		RecetarioChefDAO.getInstance().generarYGuardarPDF(seleccionDelChef, RecetasChefDao.getInstance().getRecetasChefByUserId(1));
		
		
		
		
		
		/* Metodos que desarrolle pero al final no hicieron faltas o fueron mejorados.
		//********** METODOS VISIBLE ******************
		System.out.println("\nhacer a todos falsos");
		RecetarioChefDAO.getInstance().habilitarTodosParaVisibleEnBaseDeDatos();
				
		System.out.println(RecetarioChefDAO.getInstance().getAll());
		System.out.println("\nhacer visible solo los que tenga numero 3");
		
		RecetarioChefDAO.getInstance().habilitarVisiblePorIdUsuario(3);
		System.out.println(RecetarioChefDAO.getInstance().getAll());
				
		System.out.println("\nComprueba la cantidad de recetas sea como minimo 5");//devuelve un true si es verdadero
		System.out.println(RecetarioChefDAO.getInstance().traerSeleccionDelChefPorIdUsuario5(4));
		
		//RecetarioChefDAO.getInstance().generarYGuardarPDF(seleccionDelChef, RecetasChefDao.getInstance().getAllRecetasChef());
		//------------------------RecetaEnSeleccionDelChefDao--------receta en seleccion de receta----------------------------------
		
		System.out.println("---------Add MANUAL DE RECETA EN SELECCION DEL CHEF--------------------------------------");
		System.out.println("add Receta En Seleccion Del Chef: \n");
		RecetaEnSeleccionDelChef recetaEnSeleccionDelChef = new RecetaEnSeleccionDelChef(1,1);		
		try {
			System.out.println(RecetaEnSeleccionDelChefDao.getInstance().addRecetaEnSeleccionDelChef(recetaEnSeleccionDelChef));
		} catch (Exception e) {
			System.out.println(e.getMessage());
		}			
		System.out.println("\nTraigo Receta En Seleccion Del Chef id: 4\n");
		System.out.println(RecetaEnSeleccionDelChefDao.getInstance().getRecetaEnSeleccionDelChefById(1));			
		System.out.println("\nBorro Receta En Seleccion Del Chef id: 8\n");
		System.out.println(RecetaEnSeleccionDelChefDao.getInstance().deleteRecetaEnSeleccionDelChef(1));		
		System.out.println("\nTraigo todos las Receta En Seleccion Del Chef:  \n");
		System.out.println(RecetaEnSeleccionDelChefDao.getInstance().getAllRecetaEnSeleccionDelChef());
		
		//*********** OTROS METODOS PARA USO DE LAS RECETAS ******************
		System.out.println("\n\nTraigo receta por id:1 \n");
		System.out.println(RecetasChefDao.getInstance().getRecetaById(1));
		System.out.println("Borro todas las recetas: \n");
		RecetasChefDao.getInstance().deleteAllRecetasChef("Recetas_Chef");
		System.out.println("Borro receta por id:2 \n");
		System.out.println(RecetasChefDao.getInstance().deleteRecetaChef(2));
		---------------------------------------------------------------------
		//********** OTROS METODOS PARA USO DE LAS USUARIOS ******************
		System.out.println("\n\nTraigo usuario por id: \n");
		System.out.println(UsuarioChefDao.getInstance().getUsersById(14));
		UsuarioChefDao.getInstance().deleteAllUsersChef("users"); 
		System.out.println("\n\nBorro usuario por id: \n");
		System.out.println(UsuarioChefDao.getInstance().deleteUserChefbyId(15));
		---------------------------------------------------------------------
		//********** OTROS METODOS PARA USO DEL RECETARIO ******************
		System.out.println("\nTraigo selelccion de chef id: 4\n");
		System.out.println(RecetarioChefDAO.getInstance().getSeleccionDelChefById(4)); 
		System.out.println("\nBorro selelccion de chef id: 3\n");
		System.out.println(RecetarioChefDAO.getInstance().deleteSeleccionDelChef(3));
		System.out.println("\nTraigo todos los  selelccion de chef:  \n");
		System.out.println(RecetarioChefDAO.getInstance().getAll());
		---------------------------------------------------------------------
		*/
	}
}
