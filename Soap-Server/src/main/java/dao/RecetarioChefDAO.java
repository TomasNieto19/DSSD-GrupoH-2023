package dao;

import javax.persistence.EntityManager;
import javax.persistence.Query;

import entities.RecetarioChef;
import entities.RecetasChef;
import entities.RecetasEnRecetario;
import entities.Recipe_in_RecipeBook;
import entities.UsuarioChef;

import java.sql.PreparedStatement;
import java.sql.SQLException;
import java.util.List;

public class RecetarioChefDAO {
	
	private static RecetarioChefDAO instance;

	// Patron Singleton para reutilizar la instancia en el serivce
	public static RecetarioChefDAO getInstance() {

		if (instance == null) {
			instance = new RecetarioChefDAO();
		}
		return instance;
	}
	
	

	
	
	
	
	
	}
	
	
	
    /*private static EntityManager entityManager;

    public RecetarioChefDAO(EntityManager entityManager) {
        this.entityManager = entityManager;
    }

    // Crear un recetario público
    public RecetarioChef crearRecetarioPublico(UsuarioChef usuario, String nombreRecetario) {
        RecetarioChef recetario = new RecetarioChef();
        recetario.setUsuarioChef(usuario);
        recetario.setNombreRecetario(nombreRecetario);
        recetario.setVisibleComunidad(true); // Marcar como público
        entityManager.persist(recetario);
        return recetario;
    }

   

    // Obtener todos los recetarios públicos
    public List<RecetarioChef> obtenerRecetariosPublicos() {
        String jpql = "SELECT r FROM RecetarioChef r WHERE r.visibleComunidad = true";
        Query query = entityManager.createQuery(jpql, RecetarioChef.class);
        return query.getResultList();
    }

    // Comprobar si un recetario contiene al menos 5 recetas
    public boolean recetarioCumpleRequisitos(RecetarioChef recetario) {
        List<RecetasEnRecetario> recetas = recetario.getRecetasEnRecetario();
        return recetas.size() >= 5;
    }*/

