package test;

import dao.RecetasChefDao;
import dao.UsuarioChefDao;
import entities.RecetasChef;
import entities.UsuarioChef;

public class Utilidades {
	public static void agregarCincoRecetas() {

		String titulo = "Receta de Lomo de cerdo a la mostaza.";
		String descripcion = "El plato te presentamos consiste en una receta clásica que se elabora de manera rápida y sencilla.";
		int tiempoCoccion = 30;
		String ingredientes = "Ingrediente 1 " + "Ingrediente 2 " + "Ingrediente 3 " + "Ingrediente 4 ";
		String pasos = "Paso 1 " + "Paso 2 " + "Paso 3 " + "Paso 4 ";
		String fotos = "https://cdn0.recetasgratis.net/es/posts/4/7/9/lomo_de_cerdo_a_la_mostaza_76974_600.jpg";
		int idUsuario = 1;
		RecetasChef recetasChefEnCasa1 = new RecetasChef(titulo, descripcion, tiempoCoccion, ingredientes, pasos,idUsuario,fotos);

		titulo = "Receta de Lomo a la naranja con mostaza.";
		descripcion = "El plato te presentamos consiste en una receta clásica que se elabora de manera rápida y sencilla.";
		tiempoCoccion = 40;
		fotos = "https://cdn0.recetasgratis.net/es/posts/7/9/2/lomo_a_la_naranja_con_mostaza_46297_600.jpg";
		idUsuario = 1;
		RecetasChef recetasChefEnCasa2 = new RecetasChef(titulo, descripcion, tiempoCoccion, ingredientes, pasos,idUsuario,fotos);

	titulo = "Receta de Ensalada de pasta con atún.";
		descripcion = "La ensalada de pasta con atún y huevo es una receta que la podemos considerar “salvavidas”, ya que es fácil para esos días en los que no hay tiempo de cocinar.";
		tiempoCoccion = 30;
		fotos = "https://cdn0.recetasgratis.net/es/posts/2/3/9/ensalada_de_pasta_con_atun_76932_600.jpg";
		idUsuario = 4;
		RecetasChef recetasChefEnCasa3 = new RecetasChef(titulo, descripcion, tiempoCoccion, ingredientes, pasos,idUsuario,fotos);

		titulo = "Receta de Pescado a lo macho";
		descripcion = "El pescado a lo macho es uno de los platos estelares de la costa peruana. El origen de su nombre tiene un par de versiones, una de ellas hace referencia al creador de este potaje.";
		tiempoCoccion = 45;
		fotos = "https://cdn0.recetasgratis.net/es/posts/0/8/6/pescado_a_lo_macho_76680_600.jpg";
		RecetasChef recetasChefEnCasa4 = new RecetasChef(titulo, descripcion, tiempoCoccion, ingredientes, pasos,idUsuario,fotos);

		titulo = "Receta de Ñoquis de calabaza y papa.";
		descripcion = "Los ñoquis son una de las pastas más sencillas de preparar, ya que no requieren ninguna técnica ni utensilio en particular, ya que si no dispones de “ñoquera”, puedes proporcionar la forma con un tenedor. El único secreto para que queden tiernos y suaves es no agregar demasiada harina.";
		tiempoCoccion = 45;
		fotos = "https://cdn0.recetasgratis.net/es/posts/3/4/9/noquis_de_calabaza_y_papa_76943_600.jpg";
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
		UsuarioChef usuarioChef3 = new UsuarioChef("Mirian Pastori", "MirianPastori@gmail.com", "Mica2222", "1234cinco");
		try {
			UsuarioChefDao.getInstance().addUsersChef(usuarioChef1);
			UsuarioChefDao.getInstance().addUsersChef(usuarioChef2);
			UsuarioChefDao.getInstance().addUsersChef(usuarioChef3);
		} catch (Exception e) {

			System.out.println(e.getMessage());
		}
	}

}
