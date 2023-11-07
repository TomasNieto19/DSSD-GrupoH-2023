package services;
import java.io.ByteArrayOutputStream;
import java.io.FileOutputStream;
import java.io.IOException;
import java.net.URL;
import java.util.List;

import javax.jws.WebService;
import javax.persistence.EntityManager;
import javax.persistence.EntityTransaction;

import com.itextpdf.text.Document;
import com.itextpdf.text.DocumentException;
import com.itextpdf.text.Element;
import com.itextpdf.text.Image;
import com.itextpdf.text.PageSize;
import com.itextpdf.text.Paragraph;
import com.itextpdf.text.pdf.PdfWriter;

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

@Override
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

@Override
public void generarYGuardarPDF(SeleccionDelChef seleccionDelChef, List<RecetasChef> recetas) {
	 Document document = new Document(PageSize.A4);

	    try {
	        // Definir la ubicación de almacenamiento y el nombre del archivo PDF
	        String rutaAlmacenamiento = "C:\\ruta\\";
	        Integer traerNombre = recetas.get(0).getUsers();
	        String nombreArchivo = "user"+traerNombre+"seleccion_del_chef.pdf";
	        String rutaCompleta = rutaAlmacenamiento + nombreArchivo;

	        // Crear el archivo PDF
	        PdfWriter.getInstance(document, new FileOutputStream(rutaCompleta));
	        document.open();

	        // Título del PDF
	        Paragraph titulo = new Paragraph("SELECCIÓN DEL CHEF " + " User: "+traerNombre);
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





}
