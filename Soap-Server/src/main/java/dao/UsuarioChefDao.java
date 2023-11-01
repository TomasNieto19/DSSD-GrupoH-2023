package dao;

import java.util.List;

import javax.persistence.EntityManager;
import javax.persistence.EntityTransaction;
import javax.persistence.Query;

import entities.RecetasChef;
import entities.UsuarioChef;

public class UsuarioChefDao {

	private static UsuarioChefDao instance;
	
	public static UsuarioChefDao getInstance() {

		if (instance == null) {
			instance = new UsuarioChefDao();
		}
		return instance;
	}
	
	public UsuarioChef addUsersChef(UsuarioChef usuarioChefEnCasa) throws Exception {
	    EntityManager em = JPAUtil.getEMF().createEntityManager();
	    UsuarioChef usuarioChefPersistido = null;

	    try {
	        em.getTransaction().begin();
	        // Utiliza merge para agregar o actualizar el usuario en la base de datos
	        usuarioChefPersistido = em.merge(usuarioChefEnCasa);
	        em.getTransaction().commit();
	    } catch (Exception e) {
	        throw new Exception("Error al persistir UsuarioChef: ");
	    } finally {
	        em.close();
	    }

	    return usuarioChefPersistido;
	}
	
	public List<UsuarioChef> getAllUsers() {
        EntityManager em = JPAUtil.getEMF().createEntityManager();
        List<UsuarioChef> users = null;

        try {
            String jpql = "SELECT u FROM UsuarioChef u";
            Query query = em.createQuery(jpql, UsuarioChef.class);
            users = query.getResultList();
        } finally {
            em.close();
        }

        return users;
    }
	
	public void deleteAllUsersChef(String tabla) {
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
        
        	
        }
	
	// Metodo para traer usuario por id
			public UsuarioChef getUsersById(int idUser) {

				EntityManager em = JPAUtil.getEMF().createEntityManager();
				UsuarioChef usuario  = null;

				try {

					usuario  = em.find(UsuarioChef.class, idUser);

				} finally {

					em.close();
				}

				return usuario ;
			}
	

			public String deleteUserChefbyId(int idUser) {

				String res = "";
				EntityManager em = JPAUtil.getEMF().createEntityManager();
				UsuarioChef usuario = null;

				try {
					usuario = em.find(UsuarioChef.class, idUser);// lo busco
					em.getTransaction().begin();
					em.remove(usuario);
					em.getTransaction().commit();

					res = "Usuario eliminado correctamente.";

				} catch (Exception e) {
					res = "Error al borrar usuario.";
				}

				return res;

			}
}
