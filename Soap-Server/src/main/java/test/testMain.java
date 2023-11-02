package test;

import dao.RecetaEnSeleccionDelChefDao;
import dao.RecetarioChefDAO;
import entities.RecetaEnSeleccionDelChef;
import entities.RecipeBook;
import entities.Recipe_in_RecipeBook;
import entities.SeleccionDelChef;

public class testMain {

	public static void main(String[] args) {
		
		
		/*
		RecetaEnSeleccionDelChef recetaEnSeleccionDelChef = new RecetaEnSeleccionDelChef (2,2);
		
		try {
			System.out.println(RecetaEnSeleccionDelChefDao.getInstance().addRecetaEnSeleccionDelChef(recetaEnSeleccionDelChef));
		} catch (Exception e) {
			System.out.println(e.getMessage());
		}
		
		System.out.println("traigo todos los recetarios");
		System.out.println(RecetaEnSeleccionDelChefDao.getInstance().getRecetaEnSeleccionDelChefById(2));
		
		*/
		
		
		/*
		  RecipeBook recipebook=new RecipeBook("Recetario 3",1);
		  
		  try {
		  System.out.println(RecipeBookDao.getInstance().addOrUpdateRecipeBook(recipebook));
		  } catch (Exception e) { // TODO Auto-generated catch block
		  System.out.println(e); }
		 
		
		System.out.println(RecipeBookDao.getInstance().getRecipeBookById(5));
		
		System.out.println(RecipeBookDao.getInstance().deleteRecipeBook(3));
		System.out.println(RecipeBookDao.getInstance().deleteRecipeBook(4));
		*/
		
		/*
		  Recipe_in_RecipeBook aux= new Recipe_in_RecipeBook(2,1);//agrego al recetario  id=2 la receta id=1;
		 
		  
		  
		  try {
		  System.out.println(RecipeBookDao.getInstance().addOrUpdateRecipeInRecipeBook(
		  aux)); } catch (Exception e) { // TODO Auto-generated catch block
		  e.printStackTrace(); }
		 
		 
		
		System.out.println(RecipeBookDao.getInstance().getRecipeInRecipeBookById(1));
		
		//System.out.println(RecipeBookDao.getInstance().deleteRecipefromRecipeBook(1, 2));
		
		//System.out.println(RecipeBookDao.getInstance().getRecipeInRecipeBookById(1));
		
		//System.out.println(RecipeBookDao.getInstance().userIsModerator(1));
		 
		 */
	}

}
