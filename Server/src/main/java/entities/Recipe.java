package entities;

import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import java.util.ArrayList;
import java.util.List;
import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.Table;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.OneToMany;
import lombok.AllArgsConstructor;
import lombok.NoArgsConstructor;
import lombok.ToString;
import lombok.Getter;
import lombok.Setter;

@Entity
@NoArgsConstructor
@AllArgsConstructor
@ToString
@Setter
@Getter
@Table(name = "recipe")
public class Recipe {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name = "id_recipe")
	private int idRecipe;

	@Column(name = "title", nullable = false)
	private String title;

	@Column(name = "description", nullable = false)
	private String description;

	@Column(name = "ingredients", nullable = false)
	private String ingredients;

	@Column(name = "category", nullable = false)
	private String category;

	@Column(name = "steps", nullable = false)
	private String steps;

	@Column(name = "preparation_time", nullable = false)
	private int preparationTime;

	@ManyToOne
	@JoinColumn(name = "id_user", nullable = true)
	private User user;

	@OneToMany(mappedBy = "recipe", cascade = CascadeType.ALL, fetch = FetchType.EAGER)
	private List<Photo> photos = new ArrayList<Photo>();

	public Recipe(String title, String description, String ingredients, String category, String steps, int preparationTime, User user) {
		this.title = title;
		this.description = description;
		this.ingredients = ingredients;
		this.category = category;
		this.steps = steps;
		this.preparationTime = preparationTime;
		this.user = user;
	}
}