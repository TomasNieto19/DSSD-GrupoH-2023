package services;
import java.util.List;

import javax.jws.WebService;
import javax.persistence.EntityManager;
import javax.persistence.EntityTransaction;

import dao.JPAUtil;
import dao.RecetaEnSeleccionDelChefDao;
import dao.RecetarioChefDAO;
import dao.RecetasChefDao;
import dao.RecipeBookDao;
import entities.RecetaEnSeleccionDelChef;
import entities.RecetasChef;
import entities.RecipeBook;
import entities.Recipe_in_RecipeBook;
import entities.SeleccionDelChef;


@WebService(endpointInterface = "services.IRecipeBookService")//
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
public List<SeleccionDelChef> getAll() {
	List<SeleccionDelChef> seleccionChef = RecetarioChefDAO.getInstance().getAll();
	return seleccionChef;
}








}
