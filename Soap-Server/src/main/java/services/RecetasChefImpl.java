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


@WebService(endpointInterface = "services.IRecetaChef")//
public class RecetasChefImpl implements IRecetaChef{


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


}
