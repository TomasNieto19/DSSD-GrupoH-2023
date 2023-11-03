package services;
import java.util.List;

import javax.jws.WebService;

import dao.RecetaEnSeleccionDelChefDao;
import dao.RecetarioChefDAO;
import dao.RecipeBookDao;
import entities.RecetaEnSeleccionDelChef;
import entities.RecipeBook;
import entities.Recipe_in_RecipeBook;
import entities.SeleccionDelChef;


@WebService(endpointInterface = "services.IRecipeBookService")//tome los metodos desde aca.
public class SeleccionDelChefServiceImpl implements ISeleccionDelChefService {
		
@Override
public String addSeleccionDelChef(String name, int iduser, boolean visibleComunidad) {
	String res="";
	
	try {
		
		SeleccionDelChef seleccionDelChef = new SeleccionDelChef(name,iduser, false);
		
		RecetarioChefDAO.getInstance().addOrUpdateSeleccionDelChef(seleccionDelChef);

		res="Seleccion del chef añadido con exito";

	} catch (Exception e) {

		res="Error al añadir Seleccion del chef.";
}
	return res;
}

@Override
public List<SeleccionDelChef> getAllSeleccionDelChef() {
	List<SeleccionDelChef> seleccionChef = RecetarioChefDAO.getInstance().getAll();
	return seleccionChef;
}

@Override
public SeleccionDelChef getSeleccionDelChefById(int idSelecChef) {
	SeleccionDelChef seleccionChef = RecetarioChefDAO.getInstance().getSeleccionDelChefById(idSelecChef);
	return seleccionChef;
}

@Override
public String deleteSeleccionDelChef(int idSelecChef) {
	String res="";
	
	try {
		
		RecetarioChefDAO.getInstance().deleteSeleccionDelChef(idSelecChef);

		res="Recetario eliminado con exito";

	} catch (Exception e) {

		res="Error al eliminar Recetario.";
	}
	return res;
}
 //otra clase
@Override
public String addRecetaEnSeleccionDelChef(int idRecetario, int idReceta) {
	String res="";
	
	try {
		
		RecetaEnSeleccionDelChef recetaEnSeleccionDelChef = new RecetaEnSeleccionDelChef(idRecetario,idReceta);
		
		RecetaEnSeleccionDelChefDao.getInstance().addRecetaEnSeleccionDelChef(recetaEnSeleccionDelChef);

		res="Receta añadida a la Receta En Seleccion Del Chef con exito";

	} catch (Exception e) {

		res="Error al añadir Receta En Seleccion Del Chef";
}
	return res;

}

@Override
public List<RecetaEnSeleccionDelChef> getAllRecetaEnSeleccionDelChef() {
	List<RecetaEnSeleccionDelChef> seleccionChef = RecetaEnSeleccionDelChefDao.getInstance().getAllRecetaEnSeleccionDelChef();
	return seleccionChef;
	}

@Override
public RecetaEnSeleccionDelChef getRecetaEnSeleccionDelChefById(int id) {
	RecetaEnSeleccionDelChef recetaEnSeleccionDelChef = RecetaEnSeleccionDelChefDao.getInstance().getRecetaEnSeleccionDelChefById(id );
	return recetaEnSeleccionDelChef;
}

 
@Override
public String deleteRecetaEnSeleccionDelChef(int idSelecChef) {
	String res="";
	
	try {
		
		RecetaEnSeleccionDelChefDao.getInstance().deleteRecetaEnSeleccionDelChef(idSelecChef);

		res="Receta En Seleccion Del Chef eliminado con exito";

	} catch (Exception e) {

		res="Error al eliminar Receta En Seleccion Del Chef.";
	}
	return res;
}





}
