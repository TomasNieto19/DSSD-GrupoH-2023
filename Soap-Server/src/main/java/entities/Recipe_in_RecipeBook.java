package entities;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;

import lombok.AllArgsConstructor;
import lombok.EqualsAndHashCode;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

@Entity
@NoArgsConstructor
@AllArgsConstructor
@ToString
@EqualsAndHashCode
@Setter
@Getter
@Table(name = "recipe_in_recipebook")
public class Recipe_in_RecipeBook {
	
	@Id
	@Column(name = "id")
	@ToString.Exclude
	private int id;//esta variable la creo para que poner una PK, sino se rompe todo(tambien esta en la bd)
	
	@Column(name = "id_recipe_book")
	private int id_recipe_book;
	@Column(name = "id_recipe")
	private int id_recipe;
	
	
	  public Recipe_in_RecipeBook(int id_recipe_book, int id_recipe) { 
		  super();
		  this.id_recipe_book = id_recipe_book; 
		  this.id_recipe = id_recipe; 
	  }
	 
	
	
}
