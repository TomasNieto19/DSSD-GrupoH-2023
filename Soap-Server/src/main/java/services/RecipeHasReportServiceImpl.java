package services;

import java.util.List;

import javax.jws.WebService;

import dao.RecipeBookDao;
import dao.RecipeHasReportDao;
import entities.RecipeBook;
import entities.Recipe_has_report;

@WebService(endpointInterface = "services.IRecipeHasReportService")
public class RecipeHasReportServiceImpl implements IRecipeHasReportService{

	@Override
	public String addOrUpdateReport(int id_recipe, String reason, boolean is_reason) {
		// TODO Auto-generated method stub
		String res="";
		
		try {
			
			Recipe_has_report recipeHasReport = new Recipe_has_report(id_recipe,reason,is_reason);
			
			RecipeHasReportDao.getInstance().addOrUpdateReport(recipeHasReport);

			res="Receta denunciada se añadido con exito";

		} catch (Exception e) {

			res="Error al añadir Receta.";
	}
		return res;
	}

	@Override
	public List<Recipe_has_report> getAll() {
		// TODO Auto-generated method stub
		List<Recipe_has_report> denuncias = RecipeHasReportDao.getInstance().getAll();
		return denuncias;
	}

	@Override
	public String ignoreRecipeReport(int id_report) {
		// TODO Auto-generated method stub
		String res="";
		
		try {
			
			 RecipeHasReportDao.getInstance().ignoreRecipeReport(id_report);

			res="Receta se ignoro con exito";

		} catch (Exception e) {

			res="Error al ignorar Receta.";
		}
		return res;
	}

	@Override
	public String deleteRecipeReport(int id_recipe) {
		// TODO Auto-generated method stub
		String res="";
		
		try {
			
			 RecipeHasReportDao.getInstance().deleteRecipeReport(id_recipe);

			res="Receta se elimino con exito";

		} catch (Exception e) {

			res="Error al eliminar Receta.";
		}
		return res;
	}

	
	
}
