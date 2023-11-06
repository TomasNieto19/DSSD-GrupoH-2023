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


@WebService(endpointInterface = "services.IRecetaEnSeleccionDelChefService")//tome los metodos desde aca.
public class RecetaEnSeleccionDelChefImpl implements IRecetaEnSeleccionDelChefService{

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
