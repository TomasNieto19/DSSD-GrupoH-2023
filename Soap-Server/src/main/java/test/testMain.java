package test;

import dao.RecipeBookDao;
import dao.RecipeHasReportDao;
import entities.RecipeBook;
import entities.Recipe_has_report;
import entities.Recipe_in_RecipeBook;

public class testMain {

	public static void main(String[] args) {
		// TODO Auto-generated method stub
		
		Recipe_has_report prueba = new Recipe_has_report(2,"Contenido inapropiado",true);
		
		try {
			//System.out.println(RecipeHasReportDao.getInstance().addOrUpdateReport(prueba));
			
			//System.out.println(RecipeHasReportDao.getInstance().getAll());
			//System.out.println(RecipeHasReportDao.getInstance().ignoreRecipeReport(2));
			System.out.println(RecipeHasReportDao.getInstance().deleteRecipeReport(2));
			
		}catch (Exception e) { // TODO Auto-generated catch block
			 System.out.println(e); }
		/*
		 * RecipeBook recipebook=new RecipeBook("Recetario 3",1);
		 * 
		 * try {
		 * System.out.println(RecipeBookDao.getInstance().addOrUpdateRecipeBook(recipebook));
		 * } catch (Exception e) { // TODO Auto-generated catch block
		 * System.out.println(e); }
		 */
		
		//System.out.println(RecipeBookDao.getInstance().getRecipeBookById(5));
		
		//System.out.println(RecipeBookDao.getInstance().deleteRecipeBook(5));
		//System.out.println(RecipeBookDao.getInstance().deleteRecipeBook(6));
		
		
		/*
		 * Recipe_in_RecipeBook aux= new Recipe_in_RecipeBook(2,1);//agrego al recetario
		 * id=2 la receta id=1
		 * 
		 * 
		 * try {
		 * System.out.println(RecipeBookDao.getInstance().addOrUpdateRecipeInRecipeBook(
		 * aux)); } catch (Exception e) { // TODO Auto-generated catch block
		 * e.printStackTrace(); }
		 */
		 
		
		//System.out.println(RecipeBookDao.getInstance().getRecipeInRecipeBookById(1));
		
		//System.out.println(RecipeBookDao.getInstance().deleteRecipefromRecipeBook(1, 2));
		
	}

}
