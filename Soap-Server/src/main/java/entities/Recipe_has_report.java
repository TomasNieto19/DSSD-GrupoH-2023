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
@ToString
@EqualsAndHashCode
@Setter
@Getter
@Table(name = "recipe_has_report")
public class Recipe_has_report {
	@Id
	@Column(name = "id_report")
	private int id_report;
	
	@Column(name = "id_recipe")
	private int id_recipe;
	
	@Column(name = "reason")
	private String reason;
	
	@Column(name = "is_reason")
	private boolean is_reason;

	public Recipe_has_report(int id_recipe, String reason, boolean is_reason) {
		super();
		this.id_recipe = id_recipe;
		this.reason = reason;
		this.is_reason = is_reason;
	}
	
	

}
