package entities;


import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
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
@Table(name = "recipe_book")
public class RecipeBook {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name = "id_recipe_book")
	private int idRecipeBook;
	
	@Column(name = "name", nullable = false)
	private String name;
	
	@Column(name = "id_user", nullable = false)
	private int idUser;
	
	
	public RecipeBook(String name, int idUser) {
		super();
		this.name = name;
		this.idUser = idUser;
	}

	
}
