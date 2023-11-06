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

@Override
public List<RecetasChef> getAllRecetasChef() {
	List<RecetasChef> recetasChef = RecetasChefDao.getInstance().getAllRecetasChef();
	return recetasChef;
}


@Override
public RecetasChef getRecetasChefByUserId(int userId) {
	RecetasChef recetasChef = (RecetasChef) RecetasChefDao.getInstance().getRecetasChefByUserId(userId);
	return recetasChef;
}

@Override
public String deleteAllRecetasChef(String tabla) {
    EntityManager em = JPAUtil.getEMF().createEntityManager();
    EntityTransaction tx = null;

    try {
        tx = em.getTransaction();
        tx.begin();

        // Utiliza una sentencia SQL para eliminar todos los registros de la tabla
      
        String sql = "DELETE FROM "+tabla.toString();
        em.createNativeQuery(sql).executeUpdate();
        tx.commit();
        System.out.println("Todos los registros de la tabla: "+ tabla +", fueron borrados con Exito!");
    } catch (Exception e) {
        if (tx != null && tx.isActive()) {
            tx.rollback();
            System.out.println("La tabla:" + tabla + "esta vacia." );
            e.printStackTrace();
        }
    } finally {
        em.close();
    }
	return tabla;
    
    
}

@Override
public RecetasChef getRecetaById(int idRecipe) {
	RecetasChef recetasChef = RecetasChefDao.getInstance().getRecetaById(idRecipe);
		return recetasChef;

}

@Override
public String deleteRecetaChef(int idRecipe) {
		String res="";
		
		try {
			
			RecetasChefDao.getInstance().deleteRecetaChef(idRecipe);

			res="Receta Del Chef eliminado con exito";

		} catch (Exception e) {

			res="Error al eliminar Receta Chef.";
		}
		return res;
	}

@Override
public String addRecetasChef(String title, String description, int cookTime, String ingredients, String steps,
		Integer users, String photoUrl) {
	String res="";
	try {
		
		RecetasChef recetasChef = new RecetasChef(  title,   description,   cookTime,   ingredients,   steps,   users,   photoUrl);
		
		RecetasChefDao.getInstance().addRecetasChef(recetasChef);

		res="recetas Chef añadido con exito";

	} catch (Exception e) {

		res="Error al añadir recetas Chef.";
}
	return res;
}

@Override
public List<SeleccionDelChef> getAll() {
	List<SeleccionDelChef> seleccionChef = RecetarioChefDAO.getInstance().getAll();
	return seleccionChef;
}








}
