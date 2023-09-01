package dao;

import javax.persistence.EntityManagerFactory;
import javax.persistence.Persistence;

public class JPAUtil {

	private static EntityManagerFactory emf;

	// Patron Singleton para reutilizar la instancia en las clases a persistir
	public static EntityManagerFactory getEMF() {
		if (emf == null) {
			emf = Persistence.createEntityManagerFactory("EntityManager");
		}
		return emf;
	}
}