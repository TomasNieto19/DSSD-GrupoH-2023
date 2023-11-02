package test;

import dao.RecetasChefDao;
import dao.UsuarioChefDao;
import entities.RecetasChef;
import entities.UsuarioChef;

public class Utilidades {
	public static void agregarCincoRecetas() {

		String titulo = "Receta de Lomo de cerdo a la mostaza.\n";
		String descripcion = "El plato te presentamos consiste en una receta clásica que se elabora de manera rápida y sencilla.\n";
		int tiempoCoccion = 30;
		String ingredientes = "Ingrediente 1 " + "Ingrediente 2 " + "Ingrediente 3 " + "Ingrediente 4 \n";
		String pasos = "Paso 1 " + "Paso 2 " + "Paso 3 " + "Paso 4 \n";
		String fotos = "\nhttps://cdn0.recetasgratis.net/es/posts/4/7/9/lomo_de_cerdo_a_la_mostaza_76974_600.webp"+ "\n\n";
		int idUsuario = 1;
		RecetasChef recetasChefEnCasa1 = new RecetasChef(titulo, descripcion, tiempoCoccion, ingredientes, pasos,idUsuario,fotos);

		titulo = "Receta de Lomo a la naranja con mostaza.\n";
		descripcion = "El plato te presentamos consiste en una receta clásica que se elabora de manera rápida y sencilla.\n";
		tiempoCoccion = 40;
		fotos = "\nhttps://cdn0.recetasgratis.net/es/posts/7/9/2/lomo_a_la_naranja_con_mostaza_46297_600.webp" + "\n\n";
		RecetasChef recetasChefEnCasa2 = new RecetasChef(titulo, descripcion, tiempoCoccion, ingredientes, pasos,idUsuario,fotos);

		titulo = "Receta de Ensalada de pasta con atún.\n";
		descripcion = "La ensalada de pasta con atún y huevo es una receta que la podemos considerar “salvavidas”, ya que es fácil para esos días en los que no hay tiempo de cocinar.\n";
		tiempoCoccion = 30;
		fotos = "\nhttps://cdn0.recetasgratis.net/es/posts/2/3/9/ensalada_de_pasta_con_atun_76932_600.webp" + "\n\n";
		RecetasChef recetasChefEnCasa3 = new RecetasChef(titulo, descripcion, tiempoCoccion, ingredientes, pasos,idUsuario,fotos);

		titulo = "Receta de Pescado a lo macho";
		descripcion = "El pescado a lo macho es uno de los platos estelares de la costa peruana. El origen de su nombre tiene un par de versiones, una de ellas hace referencia al creador de este potaje.";
		tiempoCoccion = 45;
		fotos = "\nhttps://cdn0.recetasgratis.net/es/posts/0/8/6/pescado_a_lo_macho_76680_600.webp" + "\n\n";
		RecetasChef recetasChefEnCasa4 = new RecetasChef(titulo, descripcion, tiempoCoccion, ingredientes, pasos,idUsuario,fotos);

		titulo = "Receta de Ñoquis de calabaza y papa.\n";
		descripcion = "Los ñoquis son una de las pastas más sencillas de preparar, ya que no requieren ninguna técnica ni utensilio en particular, ya que si no dispones de “ñoquera”, puedes proporcionar la forma con un tenedor. El único secreto para que queden tiernos y suaves es no agregar demasiada harina.\n ";
		tiempoCoccion = 45;
		fotos = "\nhttps://cdn0.recetasgratis.net/es/posts/3/4/9/noquis_de_calabaza_y_papa_76943_600.webp" + "\n\n";
		RecetasChef recetasChefEnCasa5 = new RecetasChef(titulo, descripcion, tiempoCoccion, ingredientes, pasos,idUsuario,fotos);

		try {
			// agrego 5 recetas
			RecetasChefDao.getInstance().addRecetasChef(recetasChefEnCasa1);
			RecetasChefDao.getInstance().addRecetasChef(recetasChefEnCasa2);
			RecetasChefDao.getInstance().addRecetasChef(recetasChefEnCasa3);
			RecetasChefDao.getInstance().addRecetasChef(recetasChefEnCasa4);
			RecetasChefDao.getInstance().addRecetasChef(recetasChefEnCasa5);
		} catch (Exception e) {
			System.out.println(e.getMessage());
		}

	}

	public static void agregarUsuario() {
		UsuarioChef usuarioChef1 = new UsuarioChef("Horacio Matias", "MatiasFerreira@gmail.com", "Mati4748", "qwerty");
		UsuarioChef usuarioChef2 = new UsuarioChef("Mica Soledad", "MicaPennini@gmail.com", "Mica2222", "123456");
		try {
			UsuarioChefDao.getInstance().addUsersChef(usuarioChef1);
			UsuarioChefDao.getInstance().addUsersChef(usuarioChef2);
		} catch (Exception e) {

			System.out.println(e.getMessage());
		}
	}

}
