package dao;

import javax.persistence.EntityManager;
import javax.persistence.EntityTransaction;
import javax.persistence.NoResultException;
import javax.persistence.NonUniqueResultException;
import javax.persistence.Query;
import javax.persistence.TypedQuery;

import entities.RecetasChef;
import entities.RecetaEnSeleccionDelChef;
import entities.RecipeBook;
import entities.Recipe_in_RecipeBook;
import entities.SeleccionDelChef;
import entities.UsuarioChef;

import java.sql.PreparedStatement;
import java.sql.SQLException;
import java.util.ArrayList;
import java.util.List;

import com.itextpdf.text.Document;
import com.itextpdf.text.DocumentException;
import com.itextpdf.text.Element;
import com.itextpdf.text.Image;
import com.itextpdf.text.PageSize;
import com.itextpdf.text.Paragraph;
import com.itextpdf.text.pdf.PdfWriter;

import java.io.ByteArrayOutputStream;
import java.io.FileOutputStream;
import java.io.IOException;
import java.io.OutputStream;
import java.net.URL;
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
	public SeleccionDelChef addOrUpdateSeleccionDelChef(SeleccionDelChef seleccionDelChef) throws Exception {

		EntityManager em = JPAUtil.getEMF().createEntityManager();

		SeleccionDelChef SeleccionDelChefAdd = null;

		try {
			em.getTransaction().begin();
			SeleccionDelChefAdd = em.merge(seleccionDelChef);
			em.getTransaction().commit();

		} catch (Exception e) {

			throw new Exception("Error al persistir SeleccionDelChef: ");

		} finally {

			em.close();
		}

		return SeleccionDelChefAdd;
	}

	// Metodo para traer todos los recetarios de la BD
	
		@SuppressWarnings("unchecked")

		public List<SeleccionDelChef> getAll() {
	        EntityManager em = JPAUtil.getEMF().createEntityManager();
	        List<SeleccionDelChef> seleccionDelChef = null;

	        try {
	            String jpql = "SELECT sc FROM SeleccionDelChef sc";
	            Query query = em.createQuery(jpql, SeleccionDelChef.class);
	            seleccionDelChef = query.getResultList();
	        } finally {
	            em.close();
	        }

	        return seleccionDelChef;
	    }
	
	
		
		
		// Metodo para traer seleccion Del Chef por id
		public SeleccionDelChef getSeleccionDelChefById(int idSelecChef) {

			EntityManager em = JPAUtil.getEMF().createEntityManager();
			SeleccionDelChef seleccionDelChef = null;

			try {

				seleccionDelChef = em.find(SeleccionDelChef.class, idSelecChef);

			} finally {

				em.close();
			}

			return seleccionDelChef;
		}
		
		public List<SeleccionDelChef> traerSeleccionDelChefPorIdUsuario(int idUsuario) {
		    EntityManager em = JPAUtil.getEMF().createEntityManager();
		    List<SeleccionDelChef> seleccionDelChefList = null;

		    try {
		        // Supongamos que tienes una columna "id_user" en tu entidad SeleccionDelChef
		        Query query = em.createQuery("SELECT sc FROM SeleccionDelChef sc WHERE sc.idUser = :idUsuario");
		        query.setParameter("idUsuario", idUsuario);

		        seleccionDelChefList = query.getResultList();
		    } finally {
		        em.close();
		    }

		    return seleccionDelChefList;
		}

		public List<SeleccionDelChef> traerSeleccionDelChefPorIdUsuario5(int idUsuario) {
		    EntityManager em = JPAUtil.getEMF().createEntityManager();
		    List<SeleccionDelChef> seleccionDelChefList = null;

		    try {
		        // Supongamos que tienes una columna "id_user" en tu entidad SeleccionDelChef
		        Query query = em.createQuery("SELECT sc FROM SeleccionDelChef sc WHERE sc.idUser = :idUsuario");
		        query.setParameter("idUsuario", idUsuario);

		        seleccionDelChefList = query.getResultList();

		        // Verificar si hay más de 5 resultados y configurar la visibilidad en consecuencia
		        if (seleccionDelChefList.size() > 5) {
		            for (SeleccionDelChef chef : seleccionDelChefList) {
		                System.out.println("visible true");
		            }
		        }
		    } finally {
		        em.close();
		    }

		    return seleccionDelChefList;
		}
		public void habilitarTodosParaVisibleEnBaseDeDatos() {
		    EntityManager em = JPAUtil.getEMF().createEntityManager();
		    EntityTransaction tx = em.getTransaction();

		    try {
		        tx.begin();

		        // Realiza una consulta JPQL para obtener todos los objetos SeleccionDelChef
		        TypedQuery<SeleccionDelChef> query = em.createQuery("SELECT sc FROM SeleccionDelChef sc", SeleccionDelChef.class);
		        List<SeleccionDelChef> chefs = query.getResultList();

		        // Modifica la propiedad visibleComunidad en cada objeto y actualiza en la base de datos
		        for (SeleccionDelChef chef : chefs) {
		            chef.setVisibleComunidad(false);
		            em.merge(chef); // Actualiza el objeto en la base de datos
		        }

		        tx.commit();
		    } catch (Exception e) {
		        if (tx != null && tx.isActive()) {
		            tx.rollback();
		        }
		        e.printStackTrace();
		    } finally {
		        em.close();
		    }
		}
		
		public void habilitarVisiblePorIdUsuario(int idUsuario) {
		    EntityManager em = JPAUtil.getEMF().createEntityManager();
		    EntityTransaction tx = em.getTransaction();

		    try {
		        tx.begin();

		        // Realiza una consulta JPQL para obtener los objetos SeleccionDelChef con un ID de usuario específico
		        TypedQuery<SeleccionDelChef> query = em.createQuery("SELECT sc FROM SeleccionDelChef sc WHERE sc.idUser = :idUsuario", SeleccionDelChef.class);
		        query.setParameter("idUsuario", idUsuario);

		        List<SeleccionDelChef> chefs = query.getResultList();

		        // Modifica la propiedad visibleComunidad en cada objeto y actualiza en la base de datos
		        for (SeleccionDelChef chef : chefs) {
		            chef.setVisibleComunidad(true);
		            em.merge(chef); // Actualiza el objeto en la base de datos
		        }

		        tx.commit();
		    } catch (Exception e) {
		        if (tx != null && tx.isActive()) {
		            tx.rollback();
		        }
		        e.printStackTrace();
		    } finally {
		        em.close();
		    }
		}
		public void habilitarVisiblePorIdUsuarioMayor5(int idUsuario) {
		    EntityManager em = JPAUtil.getEMF().createEntityManager();
		    EntityTransaction tx = em.getTransaction();

		    try {
		        tx.begin();

		        // Realiza una consulta JPQL para contar la cantidad de registros con un ID de usuario específico
		        TypedQuery<Long> countQuery = em.createQuery("SELECT COUNT(sc) FROM SeleccionDelChef sc WHERE sc.idUser = :idUsuario", Long.class);
		        countQuery.setParameter("idUsuario", idUsuario);
		        
		        long cantidadRegistros = countQuery.getSingleResult();

		        if (cantidadRegistros >= 5) {
		            // Realiza una consulta JPQL para obtener los objetos SeleccionDelChef con un ID de usuario específico
		            TypedQuery<SeleccionDelChef> query = em.createQuery("SELECT sc FROM SeleccionDelChef sc WHERE sc.idUser = :idUsuario", SeleccionDelChef.class);
		            query.setParameter("idUsuario", idUsuario);

		            List<SeleccionDelChef> chefs = query.getResultList();

		            // Modifica la propiedad visibleComunidad en cada objeto y actualiza en la base de datos
		            for (SeleccionDelChef chef : chefs) {
		                chef.setVisibleComunidad(true);
		                em.merge(chef); // Actualiza el objeto en la base de datos
		            }
		        }

		        tx.commit();
		    } catch (Exception e) {
		        if (tx != null && tx.isActive()) {
		            tx.rollback();
		        }
		        e.printStackTrace();
		    } finally {
		        em.close();
		    }
		}

		public byte[] generarPDFDeSeleccionDelChef(SeleccionDelChef seleccionDelChef, List<RecetasChef> recetasChef) {
		    try {
		        ByteArrayOutputStream outputStream = new ByteArrayOutputStream();
		        Document document = new Document();

		        PdfWriter.getInstance(document, outputStream);
		        document.open();

		        // Título del PDF
		        Paragraph titulo = new Paragraph("SELECCIÓN DEL CHEF " + seleccionDelChef.getIdUser());
		        titulo.setAlignment(Paragraph.ALIGN_CENTER);
		        document.add(titulo);

		        // Separar las recetas una por cada página
		        for (RecetasChef receta : recetasChef) {
		            document.newPage();

		            // Título de la receta
		            Paragraph tituloReceta = new Paragraph(receta.getTitle());
		            tituloReceta.setAlignment(Paragraph.ALIGN_CENTER);
		            document.add(tituloReceta);

		            // Descripción
		            Paragraph descripcion = new Paragraph(receta.getDescription());
		            document.add(descripcion);

		            // Tiempo de cocción
		            Paragraph tiempoCoccion = new Paragraph("Tiempo de cocción: " + receta.getCookTime());
		            document.add(tiempoCoccion);

		            // Ingredientes
		            Paragraph ingredientes = new Paragraph("Ingredientes: " + receta.getIngredients());
		            document.add(ingredientes);

		            // Pasos
		            Paragraph pasos = new Paragraph("Pasos: " + receta.getSteps());
		            document.add(pasos);

		            // Foto de la receta (esto dependerá de cómo manejes las imágenes en tu aplicación)
		            // Puedes agregar la imagen a través de iText, pero dependerá de tu implementación.
		        }

		        document.close();
		        return outputStream.toByteArray();
		    } catch (Exception e) {
		        e.printStackTrace();
		        return null;
		    }
		}
		public void generarYGuardarPDF(SeleccionDelChef seleccionDelChef, List<RecetasChef> recetas) {
		    Document document = new Document(PageSize.A4);

		    try {
		        // Definir la ubicación de almacenamiento y el nombre del archivo PDF
		        String rutaAlmacenamiento = "C:\\ruta\\";
		        Integer traerNombre = seleccionDelChef.getIdUser();
		        String nombreArchivo = "user"+traerNombre+"seleccion_del_chef.pdf";
		        String rutaCompleta = rutaAlmacenamiento + nombreArchivo;

		        // Crear el archivo PDF
		        PdfWriter.getInstance(document, new FileOutputStream(rutaCompleta));
		        document.open();

		        // Título del PDF
		        Paragraph titulo = new Paragraph("SELECCIÓN DEL CHEF " + seleccionDelChef.getIdUser());
		        Paragraph subtitulo = new Paragraph("UNLa_COOK ");
		        titulo.setAlignment(Element.ALIGN_CENTER);
		        subtitulo.setAlignment(Element.ALIGN_CENTER);
		        document.add(titulo);
		        document.add(subtitulo);
		        String logoUNLa = "https://upload.wikimedia.org/wikipedia/commons/f/f8/Universidad_Nacional_de_Lan%C3%BAs_logo.png";
		        try {
	                Image imagen = Image.getInstance(new URL(logoUNLa));
	                imagen.setAlignment(Element.ALIGN_CENTER);
	                document.add(imagen);
	            } catch (IOException e) {
	                e.printStackTrace();
	            }

		        // Separar las recetas una por cada página
		        for (RecetasChef receta : recetas) {
		            document.newPage();

		            // Título de la receta
		            Paragraph tituloReceta = new Paragraph(receta.getTitle());
		            tituloReceta.setAlignment(Element.ALIGN_CENTER);
		            document.add(tituloReceta);

		            // Descripción
		            document.add(new Paragraph("Descripción: " + receta.getDescription()));
		            
		         // Tiempo de cocción
		            document.add(new Paragraph("Tiempo de cocción: " + receta.getCookTime()));

 
		            // Ingredientes
		            document.add(new Paragraph("Ingredientes: " + receta.getIngredients()));

		            // Pasos
		            document.add(new Paragraph("Pasos: " + receta.getSteps()));

		         // Agregar la imagen desde la URL
		            try {
		                Image imagen = Image.getInstance(new URL(receta.getPhotoUrl()));
		                imagen.setAlignment(Element.ALIGN_CENTER);
		                document.add(imagen);
		            } catch (IOException e) {
		                e.printStackTrace();
		            }

		        }

		        document.close();
		        System.out.println("PDF generado y guardado en: " + rutaCompleta);
		    } catch (DocumentException | IOException e) {
		        e.printStackTrace();
		    }
		}

		public String deleteSeleccionDelChef(int idSelecChef) {

			String res = "";
			EntityManager em = JPAUtil.getEMF().createEntityManager();
			SeleccionDelChef seleccionDelChef = null;

			try {
				seleccionDelChef = em.find(SeleccionDelChef.class, idSelecChef);// lo busco
				em.getTransaction().begin();
				em.remove(seleccionDelChef);
				em.getTransaction().commit();

				res = "seleccion Del Chef eliminado correctamente.";

			} catch (Exception e) {
				res = "Error al borrar seleccion Del Chef.";
			}

			return res;

		}

}

